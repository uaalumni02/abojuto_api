import gmail from "node-gmailer";
import moment from "moment";

const recipient = process.env.GMAIL_ADDRESS;

const sendHandler = (messageData) => {
  console.log(messageData);
  const dateString = moment
    .unix(messageData.appointmentDate)
    .format("YYYY-MM-DD");
  gmail
    .send(recipient, {
      subject: "Customer Message",
      text:
        "Hi " +
        messageData.first_name +
        "your appointment has been confirmed and is scheduled on " +
        dateString +
        " at " +
        messageData.time +
        " with " +
        messageData.name,
    })
    .then((response) => {})
    .catch((error) => {});
};

export default sendHandler;
