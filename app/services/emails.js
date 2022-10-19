const cron = require('node-cron');
const sequelize = require('sequelize');
const user = require('../models/index').Users;
const weet = require('../models/index').Weets;
const emailer = require('../../config/emailer');
const { info } = require('../logger');
const { databaseError } = require('../errors');

exports.sendWelcomeMail = async userData => {
  const transporter = emailer.createTrans();
  const infoEmail = await transporter
    .sendMail({
      from: '"Weeter"<weeter@wolox.com>',
      to: userData.email,
      subject: 'Welcome to weeter',
      html: '<b>HELLO AND WELCOME TO WEETER!!</b>'
    })
    .catch(error => {
      info(error.message);
    });
  return infoEmail.accepted;
};

const getMostLongestWeet = () => {
  info('getMostLongestWeet');
  return weet
    .findOne({
      include: [
        {
          model: user
        }
      ],
      order: ['userId', [sequelize.fn('length', sequelize.col('content')), 'DESC']],
      attributes: ['User.email'],
      raw: true
    })
    .catch(error => {
      info(error.message);
      throw databaseError(error.message);
    });
};

cron.schedule('* * * * *', async () => {
  const weetWinner = await getMostLongestWeet();
  const transporter = emailer.createTrans();
  const infoEmail = await transporter
    .sendMail({
      from: '"Weeter"<weeter@wolox.com>',
      to: weetWinner.email,
      subject: 'Congratulations',
      html: '<b>You have the longest weet!!</b>'
    })
    .catch(error => {
      info(error.message);
    });
  return infoEmail.accepted;
});
