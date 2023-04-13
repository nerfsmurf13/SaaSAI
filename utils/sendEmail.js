const nodemailer = require("nodemailer");

async function sendEmail(to, subject, html) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "edward.williams.nova@gmail.com", // generated ethereal user
      pass: process.env.APPSETTING_EMAIL_PASSWORD, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"SaaS Application" <foo@example.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html,
    //   html: `<b>Hello world?</b><div><p>Your Reset Code! </p><p>This code is valid for 1 hour.
    // <a href="${resetLink}">${resetLink}</a>
    // </p></div>`, // html body
  });
}

module.exports = sendEmail;
