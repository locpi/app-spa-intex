
import { Twilio } from "twilio";

export class TwilioService{
    private accountSid = 'ACa2f363cf9a0196c402659f3c1e0228ef';
    private authToken = '9bf5600adc2bb16f13f1ad465b6b931d';
    private client = new Twilio(this.accountSid, this.authToken);

        send(){
            this.client.messages
            .create({
                body: 'Le jaccuz\' est bientot à 40, Enjoy ! 😘                ',
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+33638130996'
            })
            .then((message: { sid: any; }) => console.log(message.sid))
        }

}