import { describe, it, expect, vi } from 'vitest'
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

vi.mock('@/lib/contact', () => ({
  sendEmail: vi.fn().mockResolvedValue(true),
  sendWhatsApp: vi.fn().mockResolvedValue(undefined),
}))

function makeRequest(body: object) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/contact', () => {
  it('returns 200 on valid submission', async () => {
    const req = makeRequest({
      nombre: 'Ana',
      telefono: '2211234567',
      correo: 'ana@example.com',
      propiedad: 'Departamento',
      mensaje: 'Hola',
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })

  it('returns 400 when required fields are missing', async () => {
    const req = makeRequest({ nombre: 'Ana' })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 500 when email sending fails', async () => {
    const { sendEmail } = await import('@/lib/contact')
    vi.mocked(sendEmail).mockResolvedValueOnce(false)
    const req = makeRequest({
      nombre: 'Ana',
      telefono: '2211234567',
      correo: 'ana@example.com',
      propiedad: 'Loft',
      mensaje: '',
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })

  it('still returns 200 when WhatsApp fails', async () => {
    const { sendWhatsApp } = await import('@/lib/contact')
    vi.mocked(sendWhatsApp).mockRejectedValueOnce(new Error('wa fail'))
    const req = makeRequest({
      nombre: 'Ana',
      telefono: '2211234567',
      correo: 'ana@example.com',
      propiedad: 'Departamento',
      mensaje: '',
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })
})
