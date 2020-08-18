import nodeMailer from 'nodemailer';

let adminEmail = 'hoandtk97@gmail.com';
let adminPassword = 'nguyenduyhoa';
let adminMailHost = 'smtp.gmail.com';
let adminMailPort = 587;

let sendMail = (to, subject,htmlContent) => {
  let transpoter = nodeMailer.createTransport({
    host: adminMailHost,
    port: adminMailPort,
    secure: false,
    auth: { 
      user: adminEmail,
      pass: adminPassword
    }
  });

let options = {
  from: adminEmail,
  to: to,
  subject: subject,
  html: htmlContent
};

return transpoter.sendMail(options);

};

module.exports = sendMail;