const sgMail = require('@sendgrid/mail');


module.exports.sendMail = async(option) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  await sgMail.send(option);
}
module.exports.generateNumbers = (length) => {
    var text = "";
    var possible = "123456789";
    for (var i = 0; i < length; i++) {
      var sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return Number(text);
  }
