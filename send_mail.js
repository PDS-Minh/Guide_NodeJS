import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hichic375@gmail.com',
    pass: 'qwry pfin zkod ohcw'
  }
});

var mailOptions = {
  from: 'hichic375@gmail.com',
  to: 'minh@pmirnc.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});