const userVerificationMailOption = (email, verificationLink) =>{
    return {
        from: process.env.SENDGRID_EMAIL,
        to: email,
        subject: "Please, Verify Your Email.",
        html: `<p>Hi there!<br><br>Plese follow this <a href="${verificationLink}">link</a> to Verify Your Email.<br><br>
        Thank you,<br>Free Loadboard</p>`
    };
}

module.exports = {
    userVerificationMailOption
}