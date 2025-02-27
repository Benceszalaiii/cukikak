// "use server"
// import FormData from "form-data"; // form-data v4.0.1
// import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

// async function sendSimpleMessage() {
//   const mailgun = new Mailgun(FormData);
//   const mg = mailgun.client({
//     username: "api",
//     key: process.env.API_KEY || "API_KEY",
//     // When you have an EU-domain, you must specify the endpoint:
//     url: "https://api.eu.mailgun.net/v3"
//   });
//   try {
//     const data = await mg.messages.create("mail.cukikak.store", {
//       from: "Mailgun Sandbox <postmaster@mail.cukikak.store>",
//       to: ["Bence Szalai <szalaibence0817@gmail.com>"],
//       subject: "Hello Bence Szalai",
//       text: "Congratulations Bence Szalai, you just sent an email with Mailgun! You are truly awesome!",
//     });

//     console.log(data); // logs response data
//   } catch (error) {
//     console.log(error); //logs any error
//   }
// }
