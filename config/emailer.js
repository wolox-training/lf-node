const nodemailer = require('nodemailer');

exports.createTrans = () => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: "fd7ab089cc9ae8",
      pass: "749d561f596711"
    }
  });
  return transport;
};
