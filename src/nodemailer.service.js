const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const dotenv = require('dotenv');

dotenv.config();

const getTemplate = (template) => {
  try {
    return fs.readFileSync(
      path.join(__dirname, `./templates/${template}.hbs`),
      'utf8'
    );
  } catch (e) {
    console.log(e);
    throw Error(`Template not found`);
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SSL,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = (options) => {
  console.log(options);
  const { to, subject, params, template } = options;
  const htmlTemplate = handlebars.compile(getTemplate(template));

  try {
    return transporter.sendMail({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html: htmlTemplate(params),
    });
  } catch (e) {
    console.log(e);
    throw Error(`Error sending email`);
  }
};

exports.sendEmail = sendEmail;
