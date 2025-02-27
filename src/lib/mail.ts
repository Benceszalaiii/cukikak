import {
  SendEmailCommandInput,
  SendEmailCommandOutput,
  SES,
} from "@aws-sdk/client-ses";
const client = new SES({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET || "",
  },
});
export async function sendSimpleMail() {
  const params: SendEmailCommandInput = {
    Source: "Rajminak<rajminak@cukikak.store>",
    Destination: {
      ToAddresses: ["szollinger.rajmund@students.jedlik.eu"],
    },
    Message: {
      Subject: {
        Data: "Szia Rajmi",
      },
      Body: {
        Text: {
          Data: "Yo",
        },
      },
    },
  };

  client.sendEmail(params, (data: SendEmailCommandOutput) => {
    console.log(data);
  });
}
