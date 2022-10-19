const nodemailer = require('nodemailer');

exports.createTrans = () => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.USER_MAILTRAP,
      pass: process.env.PASSWORD_MAILTRAP
    }
  });
  return transport;
};
