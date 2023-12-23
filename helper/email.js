const nodemailer = require("nodemailer"),
  mustache = require("mustache"),
  constants = require("../config.json");

var email = {
  trigger: (data, template, cb) => {
    email.send(template, data, function (err, result) {
      if (result) cb(true, null);
      else {
        cb(null, err);
        console.log(err);
      }
    });
  },
  send: async (type, data, cb) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      service: constants.gmail.service,
      port: constants.gmail.port,
      auth: {
        user: constants.gmail.user,
        pass: constants.gmail.pass,
      },
      tls: {
        // to fix the following issue: self signed certificate in certificate chain
        rejectUnauthorized: false,
      },
    });

    var template = null;
    if (type === "contactUs") template = constants.template.contactUs;
 
    // setup email data
    var mailOptions = {
      from: data.emailAddress,
      to: constants.gmail.toAddress,
      subject: await email.formatHTML(template.subject, data),
      text: await email.formatHTML(template.textBody, data), // plain text body
      html: await email.formatHTML(template.htmlBody, data), // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return cb(error.message, null);
      }
      return cb(null, "success");
    });
  },
  formatHTML: function (template, data) {
    return mustache.render(template, data);
  },
};

module.exports = email;
