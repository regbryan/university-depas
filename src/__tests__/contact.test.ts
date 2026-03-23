import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Resend before importing contact lib
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return {
      emails: {
        send: vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
      },
    }
  }),
}))

// Mock fetch for CallMeBot
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

import { sendEmail, sendWhatsApp } from '@/lib/contact'

beforeEach(() => {
  vi.clearAllMocks()
  mockFetch.mockResolvedValue({ ok: true })
  process.env.RESEND_API_KEY = 'test-key'
  process.env.RESEND_TO_EMAIL = 'test@example.com'
  process.env.CALLMEBOT_PHONE = '521XXXXXXXXXX'
  process.env.CALLMEBOT_API_KEY = '123456'
})

describe('sendEmail', () => {
  it('sends an email with form data', async () => {
    const result = await sendEmail({
      nombre: 'Juan',
      telefono: '2211234567',
      correo: 'juan@example.com',
      propiedad: 'Departamento',
      mensaje: 'Me interesa',
    })
    expect(result).toBe(true)
  })

  it('returns false if Resend returns an error', async () => {
    const { Resend } = await import('resend')
    vi.mocked(Resend).mockImplementationOnce(function () {
      return {
        emails: {
          send: vi.fn().mockResolvedValue({ data: null, error: { message: 'fail' } }),
        },
      }
    } as any)
    const result = await sendEmail({
      nombre: 'Juan',
      telefono: '2211234567',
      correo: 'juan@example.com',
      propiedad: 'Loft',
      mensaje: '',
    })
    expect(result).toBe(false)
  })
})

describe('sendWhatsApp', () => {
  it('calls CallMeBot API with encoded message', async () => {
    await sendWhatsApp('Juan', 'Departamento')
    expect(mockFetch).toHaveBeenCalledOnce()
    const url = mockFetch.mock.calls[0][0] as string
    expect(url).toContain('api.callmebot.com')
    expect(url).toContain('521XXXXXXXXXX')
  })

  it('does not throw if CallMeBot fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network error'))
    await expect(sendWhatsApp('Juan', 'Loft')).resolves.not.toThrow()
  })
})
