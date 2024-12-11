"use server";

import mailgun from "mailgun-js";

const mailgunClient = mailgun({
  apiKey: process.env.MAILGUN_KEY || "",
  domain: "mail.cukikak.store",
})

export async function sendTest() {
  const emailData = {
    from: "Excited User <mailgun@cukikak.store>",
    to: ["test@example.com"],
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
    html: "<h1>Testing some Mailgun awesomeness!</h1>",
  }
  try {
    const result = await mailgunClient.messages().send(emailData);
    console.log('Email sent successfully!');
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
