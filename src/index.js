const { json, send } = require('micro');
const { sendEmail } = require('./nodemailer.service');

module.exports = async (req, res) => {
  const payload = await json(req);

  if (!payload) {
    send(res, 400, { response: `The payload should not be empty` });
  }

  try {
    sendEmail(payload);
    send(res, 200, { response: `Message sent with success` });
  } catch (e) {
    send(res, 400, { response: `Error sending email` });
  }
};
