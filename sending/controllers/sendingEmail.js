const nodemailer = require("nodemailer");

// NOTE: the email sent can be in trash bin

const sendEmail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // hostname
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    const MAX = 999999;
    const MIN = 100000;
    const verificationPass = Math.floor(Math.random() * (MAX - MIN) + MIN);

    const info = await transporter.sendMail({
        from: process.env.USER,
        to: req.query.email,
        subject: "Verification password",
        html: `<center><h3>Your verification password is:</h3></center><center><strong><h1>${verificationPass}</h1></strong></center>`,
    });

    res.json(info);
};

module.exports = sendEmail;
