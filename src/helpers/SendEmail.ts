import { Resend } from 'resend'

const resend = new Resend(`${process.env.RESEND_APY_KEY}`)

const sendEmail = async (token: string) => {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_USER,
      subject: 'Correo de verificación GetJob',
      html: `<p>
              <strong>
                Hola! este es el correo de confirmación para verificar tu cuenta
                en GetJob
              </strong>!
              \n
              Porfavor haz clic en el siguiente enlace
              <a 
                href="${process.env.REDIRECT_ROUTE}/${token}"
              >
                Verificar cuenta
              </a>
            </p>`
    })

    return response
  } catch (error) {
    console.log(error);
  }
}


export default sendEmail