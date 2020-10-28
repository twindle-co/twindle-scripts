const AWS = require("aws-sdk");

const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.REGION;

const creds = new AWS.Credentials({ accessKeyId, secretAccessKey });

AWS.config.region = region;
AWS.config.credentials = creds;

const SES = new AWS.SES({ apiVersion: "2010-12-01" });

async function sendEmail({ cc, to, html, text, subject, sender }) {
	const params = {
		Destination: {
			CcAddresses: cc,
			ToAddresses: to,
		},
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: html,
				},
				Text: {
					Charset: "UTF-8",
					Data: text,
				},
			},
			Subject: {
				Charset: "UTF-8",
				Data: subject,
			},
		},
		Source: sender,
		// ReplyToAddresses: [
		// 	"EMAIL_ADDRESS",
		// ],
	};
	try {
		const response = await SES.sendEmail(params).promise();
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}

module.exports = sendEmail;
