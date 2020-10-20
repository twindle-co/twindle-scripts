const AWS = require("aws-sdk");
const { region, accessKeyId, secretAccessKey } = require("../../aws.config.json");

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
