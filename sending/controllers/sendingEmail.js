const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // hostname
        port: 465,
        secureConnection: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    let info = await transporter.sendMail({
        from: process.env.USER,
        to: "s3877347@rmit.edu.vn",
        subject: "Hello",
        text: `${req.query.content}`,
    });

    res.json(info);
};

module.exports = sendEmail;
