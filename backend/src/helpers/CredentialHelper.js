import * as _ from 'lodash';
import Verida from '@verida/datastore';

const { CREDENTIAL_DB } = process.env;

/**
 *
 */
export default class CredentialHelper {
  /**
   * Take an existing database item with an embedded credential
   * and return the URI to a public credential.
   *
   * Always creates a new public credential.
   *
   * @todo implement purge() to *really* delete all deleted public creds when they expire
   *
   * @param {*} app
   * @param {*} item
   * @param options
   */
  static async issuePublicCredential(app, item, options) {
    const defaults = {
      encrypt: true,
      key: Verida.Helpers.encryption.randomKey(),
      permissions: {
        read: 'public',
        write: 'owner',
      },
    };

    options = _.merge(defaults, options);
    options = _.merge(
      {
        schema: options.encrypt
          ? 'https://schemas.verida.io/credential/public/encrypted/schema.json'
          : 'https://schemas.verida.io/credential/public/default/schema.json',
      },
      options,
    );

    const publicCredentials = await app.openDatastore(options.schema, {
      permissions: options.permissions,
    });

    delete item['_rev'];

    if (options.encrypt) {
      const key = new Uint8Array(options.key);

      const content = Verida.Helpers.encryption.symEncrypt(item.didJwtVc, key);

      item = {
        content: content,
        schema: options.schema,
      };
    }

    try {
      const result = await publicCredentials.save(item);

      const vid = await app.user.getAppVid();

      return {
        item: item,
        result: result,
        vid: vid,
        uri: CredentialHelper.getCredentialUri(vid, result.id, {
          key: options.key,
        }),
      };
    } catch (err) {
      console.log(err);
    }
  }

  static getCredentialUri(vid, itemId, params) {
    let uri = 'verida://' + vid + '/' + CREDENTIAL_DB + '/' + itemId;

    const encryptionKey = Buffer.from(params.key).toString('hex');
    if (params && params.key) {
      uri += '?key=' + encryptionKey;
    }

    return uri;
  }
}
