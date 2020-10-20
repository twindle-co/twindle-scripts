const sendEmail = require("./src/send-email");
const renderTemplate = require("./src/render-template");

async function main() {
	const emailHtml = renderTemplate({ message: "Hello this is a test message from Twindle" }, "email");
	const mailConfig = {
		cc: ["xyz@abc.com"],
		to: ["abc@xyz.com"],
		html: emailHtml,
		text: "",
		subject: "Hello from twindle",
		sender: "twindle@twindle.co",
	};

	await sendEmail(mailConfig);
}

main();
