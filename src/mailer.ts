import { config } from "dotenv"
import Nodemailer from "nodemailer"

config()

const host = process.env.MAIL_HOST as string
const mailTo = process.env.MAIL_TO as string
const user = process.env.MAIL_USER as string
const pass = process.env.MAIL_PASS as string

const transporter = Nodemailer.createTransport({
  host,
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
})

const successText = (tweet: string): MailOption => {
  return {
    from: "UBI_BOT@STATUS.YES",
    to: mailTo,
    subject: "UBI BOT STATUS - ✅ Succesfully tweeted ✅",
    text: `Lo hiciste de nuevo máquina, abrazo
    
    ${tweet}`,
  }
}

const failureText = (error: string): MailOption => {
  return {
    from: "UBI_BOT@STATUS.YES",
    to: mailTo,
    subject: "UBI BOT STATUS - ❌ Failed tweeting ❌",
    text: `TERRIBLE DRAMON, DALE QUE PERDEMOS GENTE, 
    METELE LOCO FIJATE ESTO ====> ${error}
    `,
  }
}

export const wagmiMail = (tweet: string) => {
  transporter.sendMail(successText(tweet), (err, data) => {
    if (err) {
      console.log("Mailer failed sending success mail", err)
    }
    console.log("Mailer data", data)
  })
}

export const ngmiMail = (tweetingError: string) => {
  transporter.sendMail(failureText(tweetingError), (err, data) => {
    if (err) {
      console.log("Mailer failed sending error mail", err)
    }
    console.log("Mailer data", data)
  })
}

type MailOption = {
  from: string
  to: string
  subject: string
  text: string
}
