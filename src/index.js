const { json, send } = require('micro');
const { sendEmail } = require('./nodemailer.service');

module.exports = async (req, res) => {
  const payload = await json(req);

  if (!payload) {
    throw Error(`The payload should not be empty`);
  }

  sendEmail(payload);

  send(res, 200, { response: `Message sent with success` });
};
