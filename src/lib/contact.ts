export type ContactFormData = {
  nombre: string
  telefono: string
  correo: string
  propiedad: string
  mensaje: string
}

export async function sendEmail(data: ContactFormData): Promise<boolean> {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: `Nueva consulta — ${data.propiedad}`,
        from_name: data.nombre,
        replyto: data.correo,
        name: data.nombre,
        phone: data.telefono,
        email: data.correo,
        property: data.propiedad,
        message: data.mensaje || '(sin mensaje)',
      }),
    })
    const json = await res.json()
    return json.success === true
  } catch {
    return false
  }
}

export async function sendWhatsApp(nombre: string, propiedad: string): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE
  const apiKey = process.env.CALLMEBOT_API_KEY
  if (!phone || !apiKey) return
  const message = encodeURIComponent(
    `Nueva consulta en University Depas!\nNombre: ${nombre}\nPropiedad: ${propiedad}`
  )
  try {
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${message}&apikey=${apiKey}`
    )
  } catch {
    // best-effort, never throw
  }
}
