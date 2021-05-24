const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const httpStatus = require('http-status');
const path = require('path');
const fs = require('fs-extra');

const transporter = nodemailer.createTransport({ // config mail server
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD_GMAIL
  },
  tls: {
    rejectUnauthorized: false
  }
});

const renderEmailContent = async ({
  template,
  data,
}) => {
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    `${template}.hbs`,
  );
  const rawContent = await fs.readFile(templatePath, 'utf8');
  return handlebars.compile(rawContent)(data);
};

exports.sendMail = async ({ name, email, password, template }) => {
  const content = await renderEmailContent({
    template, data: {
      name,
      email,
      password,
    }
  })
  var mainOptions = {
    from: 'no-reply@it.dictionary',
    to: email,
    subject: 'IT DICTIONARY',
    text: 'Your text is here',
    html: content,
  }
  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log(err);
    }
  });
}