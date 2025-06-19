const nodemailer=require('nodemailer');

const SendEmailUtility = async (EmailTo,EmailSubject,EmailText)=>{

    let  transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth: {
            user:"developertowhid@gmail.com",
            pass:"zgieegvuihtdkjwo"
        },
        tls:{rejectUnauthorized:false}

        // host:"mail.teamrabbil.com",
        // port:25,
        // secure:false,
        // auth:{user:"info@teamrabbil.com",pass:"~sR4[bhaC[Qs"},
        // tls:{rejectUnauthorized:false}
    })

    let mailOptions = {
        from:'Task Manager <developertowhid@gmail.com>',
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText
    }

    return await transporter.sendMail(mailOptions)
}

module.exports=SendEmailUtility;