import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, sendWhatsApp } from '@/lib/contact'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { nombre, telefono, correo, propiedad, mensaje } = body

  if (!nombre || !telefono || !correo || !propiedad) {
    return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
  }

  const emailSent = await sendEmail({ nombre, telefono, correo, propiedad, mensaje: mensaje ?? '' })

  if (!emailSent) {
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 })
  }

  // Best-effort WhatsApp — never blocks a 200 response
  sendWhatsApp(nombre, propiedad).catch(() => {})

  return NextResponse.json({ success: true }, { status: 200 })
}
