const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

const sendMail = async (recipient, subject, text, html) => {
    let info = await transporter.sendMail({
        from: `"pirata 👻" <dreadpiratemma@gmail.com>}`, // sender address
        to: `${recipient}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: `${text}`, // plain text body
        html: `${html}`
      });
}

module.exports = {
    sendMail
}