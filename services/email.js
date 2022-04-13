const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

module.exports = (userEmail, name, message ) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });


    let mailOptions;

    ejs.renderFile(path.join(__dirname, '../template/email-template.ejs'),
        {
            name,
            message
        },
        (error, data) => {
        if (error) {
            console.log(error);
        } else {
            mailOptions = {
                from: process.env.EMAIL,
                to: userEmail,
                subject: `Hello ${name}`,
                html: data
            }
        }
    });
    
    return transporter.sendMail(mailOptions);
};