var nodemailer = require('nodemailer');

require('dotenv').config();

function sendEmail(email, subject, message){
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        html: message
    };

    console.log("In the sendMail");
    console.log(email);
    console.log(subject);
    console.log(message);

    return transporter.sendMail(mailOptions);    
}

module.exports = sendEmail;