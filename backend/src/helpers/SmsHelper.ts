import twilio from 'twilio';

export default class SmsHelper {
  static async sendSmsCredential(fetchUrl, mobile) {
    const { TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM_ADDRESS } = process.env;

    // Send SMS to the credential owner with a link to the retrievable credential
    const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN, {
      lazyLoading: true,
    });

    const infoMessage = await twilioClient.messages.create({
      body: 'Please download your health credential:',
      from: TWILIO_FROM_ADDRESS,
      to: mobile,
    });
    console.log(infoMessage);
    const credMessage = await twilioClient.messages.create({
      body: fetchUrl,
      from: TWILIO_FROM_ADDRESS,
      to: mobile,
    });
    console.log(credMessage);
  }
}
