import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export default class UserService {
    //Node Mailer Configuration
    static get nodeMailerConfig() {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
            process.env.OAuth_CLIENT_ID, // ClientID
            process.env.OAuth_SECRET, // Client Secret
            "https://developers.google.com/oauthplayground" // Redirect URL
        );
        oauth2Client.setCredentials({
            refreshtoken: OAuth_REFRESHTOKEN
        });

        const accessToken = oauth2Client.refreshAccessToken()
            .then(res => res.credentials.access_token);
        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                type: "OAuth2",
                user: process.env.OAuth_USER,
                clientId: process.env.OAuth_CLIENT_ID,
                clientSecret: process.env.OAuth_SECRET,
                refreshToken: process.env.OAuth_REFRESHTOKEN,
                accessToken: accessToken
            }
        });
        return smtpTransport;
    }
    //Send a Mail with options
    static sendMail(mailOptions) {
        console.log("mailOptions", mailOptions)
        return new Promise((resolve, reject) => {
            let smtpTransport = this.nodeMailerConfig;
            //Send meail
            smtpTransport.sendMail(mailOptions, (error, response) => {
                if (error) {
                    return reject(error.message);
                } else {
                    smtpTransport.close();
                    return resolve(response);
                }
            });
        })
    }
}