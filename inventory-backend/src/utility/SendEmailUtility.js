const nodemailer = require('nodemailer');

const SendEmailUtility = async (EmailTo,EmailSubject,EmailText)=>{

    let SMTP_USER = process.env.MAIL_SMTP_USER

    let  transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth: {
            user: SMTP_USER,
            pass: process.env.MAIL_SMTP_PASSWORD
        },
        tls:{rejectUnauthorized:false}

        // host:"mail.teamrabbil.com",
        // port:25,
        // secure:false,
        // auth:{user:"info@teamrabbil.com",pass:"~sR4[bhaC[Qs"},
        // tls:{rejectUnauthorized:false}
    })

    let mailOptions = {
        from:`Inventory Management System <${SMTP_USER}>`,
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText
    }

    return await transporter.sendMail(mailOptions)
}

module.exports=SendEmailUtility;