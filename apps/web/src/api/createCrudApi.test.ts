import { jsonResponse } from '@/test/utils'
import { FilterCondition } from '@/types/DynamicQuery'
import { ApiError } from './client'
import { createCrudApi } from './createCrudApi'
import { tokenStorage } from './tokenStorage'

const fetchMock = vi.fn<typeof fetch>()
const api = createCrudApi<{ id: string; createdAt: string; updatedAt: null; active: boolean; name: string }, { name: string }>('Thing')

function lastCall() {
  const [input, init] = fetchMock.mock.calls.at(-1)!
  return { url: new URL(String(input)), init: init! }
}

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock)
  fetchMock.mockReset()
  tokenStorage.clear()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('createCrudApi', () => {
  it('serializa paginação, filtro e ordenação no formato do DynamicQuery', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ pageSize: 10, pageNumber: 2, totalRows: 0, result: [] }))

    await api.getPaged({
      pageNumber: 2,
      pageSize: 10,
      filter: [{ name: 'name', condition: FilterCondition.Contains, value: 'abc' }],
      orderBy: [{ name: 'name', order: 'desc' }],
    })

    const { url, init } = lastCall()
    expect(init.method).toBe('GET')
    expect(url.pathname).toBe('/Thing/paged')
    expect(url.searchParams.get('pageNumber')).toBe('2')
    expect(url.searchParams.get('pageSize')).toBe('10')
    expect(JSON.parse(url.searchParams.get('filterString')!)).toEqual([{ name: 'name', condition: 70, value: 'abc' }])
    expect(JSON.parse(url.searchParams.get('orderByString')!)).toEqual([{ name: 'name', order: 'desc' }])
  })

  it('omite parâmetros vazios', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ pageSize: 20, pageNumber: 0, totalRows: 0, result: [] }))

    await api.getPaged({ filter: [] })

    expect([...lastCall().url.searchParams.keys()]).toEqual([])
  })

  it('usa os verbos e rotas do padrão dos controllers', async () => {
    fetchMock.mockImplementation(async () => jsonResponse({ id: '1' }))

    await api.getById('1')
    expect(lastCall().init.method).toBe('GET')
    expect(lastCall().url.pathname).toBe('/Thing/1')

    await api.create({ name: 'a' })
    expect(lastCall().init.method).toBe('POST')
    expect(lastCall().url.pathname).toBe('/Thing')
    expect(JSON.parse(String(lastCall().init.body))).toEqual({ name: 'a' })

    await api.update('1', { name: 'b' })
    expect(lastCall().init.method).toBe('PUT')
    expect(lastCall().url.pathname).toBe('/Thing/1')

    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }))
    await api.remove('1')
    expect(lastCall().init.method).toBe('DELETE')
    expect(lastCall().url.pathname).toBe('/Thing/1')
  })

  it('envia o token salvo no header Authorization', async () => {
    tokenStorage.set('abc.def')
    fetchMock.mockResolvedValue(jsonResponse({ id: '1' }))

    await api.getById('1')

    expect((lastCall().init.headers as Record<string, string>).Authorization).toBe('Bearer abc.def')
  })

  it('transforma o erro de validação da API em ApiError com os campos', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ title: 'Um ou mais erros de validação ocorreram.', errors: { Email: ['Já existe.'] } }, 400),
    )

    const error = await api.create({ name: 'a' }).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status: 400, errors: { Email: ['Já existe.'] } })
  })

  it('apaga o token quando a API responde 401', async () => {
    tokenStorage.set('expirado')
    fetchMock.mockResolvedValue(new Response(null, { status: 401, statusText: 'Unauthorized' }))

    await expect(api.getById('1')).rejects.toMatchObject({ status: 401 })
    expect(tokenStorage.get()).toBeNull()
  })
})
