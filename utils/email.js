// const nodemailer = require('nodemailer');
// const templates = require('./templates');

// module.exports = class Email {
//   constructor(user) {
//     this.to = user.email;
//     this.name = user.name;
//   }

//   newTransport() {
//     return nodemailer.createTransport({
//       host: process.env.SMPT_SERVER,
//       port: process.env.SMPT_PORT,
//       auth: {
//         user: process.env.BREVO_USER,
//         pass: process.env.BREVO_PASS,
//       },
//     });
//   }

//   async send(subject, html) {
//     const mailOptions = {
//       from: process.env.BREVO_USER,
//       to: this.to,
//       subject,
//       html,
//     };

//     await this.newTransport().sendMail(mailOptions);
//   }

//   async sendWelcome() {
//     await this.send('🎵 Welcome to Spotify 🎧', templates.welcomeTemplate());
//   }

//   async sendResetToken(resetToken) {
//     await this.send('Reset token', templates.resetTokenTemplate(resetToken));
//   }
// };

const nodemailer = require('nodemailer');
const templates = require('./templates');

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.name = user.name;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async send(subject, html) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('🎵 Welcome to Spotify 🎧', templates.welcomeTemplate());
  }

  async sendResetToken(resetToken) {
    await this.send('Reset token', templates.resetTokenTemplate(resetToken));
  }
};
