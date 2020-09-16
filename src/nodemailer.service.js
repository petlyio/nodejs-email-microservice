const fs = require('fs');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const dotenv = require('dotenv');

dotenv.config();

const getTemplate = (template) => {
  return fs.readFileSync(path.join('./templates', `${template}.hbs`), 'utf8');
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
  const { to, subject, params, template } = options;
  const htmlTemplate = handlebars.compile(getTemplate(template));

  return transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html: htmlTemplate(params),
  });
};

exports.sendEmail = sendEmail;
