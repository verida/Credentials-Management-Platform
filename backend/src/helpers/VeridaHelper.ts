import { BadRequestException } from '@nestjs/common'

import Verida from '@verida/datastore'
import utils from '@verida/wallet-utils'
import BaseHelper from './BaseHelper'
import CredentialHelper from './CredentialHelper'

import { CreateIssuerDto } from '../modules/issuer/dto';
import { IssuerDto } from '../modules/issuer/dto';
import { Issuer } from '../modules/issuer/interfaces/issuer.interface';
import { IssueCredentialDto } from '../modules/credential/dto'

const {
    VERIDA_ENVIRONMENT,
    CREDENTIAL_DB,
    CREDENTIAL_DOWNLOAD_URL
} = process.env

Verida.setConfig({
    environment: VERIDA_ENVIRONMENT
})

export default class VeridaHelper {

    /**
     * 
     * @param createIssuerDto 
     */
    static async createIssuer(createIssuerDto: CreateIssuerDto) {
        const account = utils.createAccount(createIssuerDto.chain)

        // Create issuer instance populated with new account details
        const issuer = new IssuerDto()
        issuer.name = createIssuerDto.name
        issuer.chain = account['chain']
        issuer.did = account['did']
        issuer.privateKey = account['privateKey']
        issuer.publicKey = account['publicKey']
        issuer.address = account['address']

        return issuer
    }

    static async setIssuerName(issuer: IssuerDto) {
        const app = await VeridaHelper.connect(issuer)
        return app.profileManager.set('name', issuer.name)
    }

    static async validateCredential(cred: IssueCredentialDto) {
        // Validate the credential
        const schema = await Verida.getSchema(cred.data['schema'])
        const valid = await schema.validate(cred.data)

        if (!valid) {
            throw new BadRequestException(schema.errors)
        }
    }

    static async issueCredential(issuer: Issuer, cred: IssueCredentialDto) {
        // Convert the DOB to numeric only and fetch the mobile number
        const dob = cred.dob.replace(/\-/g, "")
        const mobile = cred.mobile

        // Generate an encryption key for the credential that combines a
        // partial random key with the user's date of birth
        
        // 6 digit alpha string + credential DOB
        const randomKey = Verida.Helpers.encryption.randomKey(24)
        const randomKeyHex = Buffer.from(randomKey).toString('hex')
        const dobHex = Buffer.from(dob).toString('hex')
        const encryptionKey = new Uint8Array(Buffer.from(randomKeyHex + dobHex, 'hex'))

        // Issue an encrypted credential
        const result = await this._issueEncryptedCredential(issuer, cred, encryptionKey)
        const credentialId = result['result'].id
        const vid = result['vid']

        // Generate a URL that combines the issuer VID, credentialId and partial encryption key
        // BASE64 encode values to save space
        const uniqueId = BaseHelper.convertBase(credentialId.replace(/\-/g,""), 16, 64)
        const keyShortened = BaseHelper.convertBase(randomKeyHex, 16, 64)
        const vidShort = BaseHelper.convertBase(vid.identifier.replace(/0x/,""), 16, 64)
        const fetchUrl = CREDENTIAL_DOWNLOAD_URL + "?v=" + vidShort + "&c=" + uniqueId + "&k=" + keyShortened

        return {
            url: fetchUrl,
            mobile: mobile,
            credentialId: credentialId
        }
    }

    static async _issueEncryptedCredential(issuer: Issuer, cred: IssueCredentialDto, encryptionKey: Uint8Array): Promise<object> {
        // @todo: Locate issuer based on current logged in user
        const app = await VeridaHelper.connect(issuer)

        // Issue a new public, encrypted verida credential
        const now = new Date()
        const credIssuer = await Verida.Helpers.credentials.createIssuer(app.user)
        const credential = {
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.w3.org/2018/credentials/examples/v1"
            ],
            "id": "",
            "type": ["VerifiableCredential"],
            "issuer": issuer.did,
            "issuanceDate": now.toISOString(),
            "credentialSubject": {
                ...cred.data
            },
            "credentialSchema": {
                "id": cred.data['schema'],
                "type": "JsonSchemaValidator2018"
            },
        }

        const didJwtVc = await Verida.Helpers.credentials.createVerifiableCredential(credential, credIssuer)

        const item = {
            didJwtVc: didJwtVc,
            ...cred.data
        }

        const result = await CredentialHelper.issuePublicCredential(app, item, {
            key: encryptionKey
        })

        return result
    }

    static async connect(issuer: IssuerDto) {
        // initialise verida server user using issuer
        const app = new Verida({
            chain: issuer.chain,
            address: issuer.address,
            privateKey: issuer.privateKey
        })

        await app.connect(true)
        return app
    }
}