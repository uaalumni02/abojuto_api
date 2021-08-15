import gmail from "node-gmailer";

const recipient = process.env.GMAIL_ADDRESS;

const sendHandler = (messageData) => {
  gmail
    .send(recipient, {
      subject: "Customer Message",
      text: messageData,
    })
    .then((response) => {})
    .catch((error) => {});
};

export default sendHandler;
