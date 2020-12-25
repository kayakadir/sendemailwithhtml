require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')

const app = express()
const port = 3000;


// Setup Config
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PAROLA
  },
  tls: {
    rejectUnauthorized: false
  }
});

const options = {
  viewEngine: {
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
  },
  viewPath: 'views',
  extName: '.hbs'
}

transporter.use('compile', hbs(options))


const order = {
  orderId: 99999,
  name: 'Kadir',
  price: 50
}

const mailInfo = {
  from: 'bts@hulpmedet.org',
  to: 'kdrky57@gmail.com',
  subject: 'Mutluluk Postasi',
  template: 'mutlulukpostasi',
  context: order
}

transporter.sendMail(mailInfo, (err, info) => {
  if (err) {
    console.log('Error: ' + err)
  } else {
    console.log("Message sent: %s", info.messageId);
  }
}) //send mail with configurations








