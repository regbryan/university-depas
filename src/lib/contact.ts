import { Resend } from 'resend'

type ContactFormData = {
  nombre: string
  telefono: string
  correo: string
  propiedad: string
  mensaje: string
}

export async function sendEmail(data: ContactFormData): Promise<boolean> {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'University Depas <noreply@universitydepas.com>',
    to: process.env.RESEND_TO_EMAIL!,
    subject: `Nueva consulta — ${data.propiedad}`,
    html: `
      <h2>Nueva consulta desde el sitio web</h2>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Teléfono:</strong> ${data.telefono}</p>
      <p><strong>Correo:</strong> ${data.correo}</p>
      <p><strong>Propiedad de interés:</strong> ${data.propiedad}</p>
      <p><strong>Mensaje:</strong> ${data.mensaje || '(sin mensaje)'}</p>
    `,
  })
  return error === null
}

export async function sendWhatsApp(nombre: string, propiedad: string): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE
  const apiKey = process.env.CALLMEBOT_API_KEY
  const message = encodeURIComponent(
    `Nueva consulta en University Depas!\nNombre: ${nombre}\nPropiedad: ${propiedad}`
  )
  try {
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${message}&apikey=${apiKey}`
    )
  } catch {
    // WhatsApp notification is best-effort — never throw
  }
}
