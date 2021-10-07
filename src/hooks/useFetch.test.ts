import { renderHook } from '@testing-library/react-hooks'
import { useFetch } from './useFetch'
import axios from 'axios'

describe('useToggle', () => {
  let axiosMock: jest.SpyInstance

  beforeEach(() => {
    axiosMock = jest.spyOn(axios, 'get')
  })

  afterEach(() => {
    axiosMock.mockRestore()
  })

  it('should call the api endpoint specified', async () => {
    axiosMock.mockResolvedValueOnce({ data: { foo: 'bar' } })
    const { waitForNextUpdate } = renderHook(() => useFetch('/test-endpoint'))
    await waitForNextUpdate()

    expect(axiosMock).toBeCalledTimes(1)
    expect(axiosMock).toHaveBeenCalledWith('https://my-json-server.typicode.com/benirvingplt/test-endpoint')
  })

  it('should return the default values if the url passed is a blank string', async () => {
    axiosMock.mockResolvedValueOnce({ data: { foo: 'bar' } })
    const { result } = renderHook(() => useFetch(''))

    expect(result.current).toEqual({ loading: true, data: null, error: false })
  })

  it('should return the data from the api', async () => {
    axiosMock.mockResolvedValueOnce({ data: { foo: 'bar' } })
    const { result, waitForNextUpdate } = renderHook(() => useFetch('/test-endpoint'))
    await waitForNextUpdate()

    expect(result.current).toEqual({ loading: false, data: { data: { foo: 'bar' } }, error: false })
  })

  it('should set error to be true if the api returns an error', async () => {
    axiosMock.mockRejectedValueOnce('ERROR')
    const { result, waitForNextUpdate } = renderHook(() => useFetch('/test-endpoint'))
    await waitForNextUpdate()

    expect(result.current).toEqual({ loading: false, data: null, error: true })
  })

  it('should return the correct loading states', async () => {
    axiosMock.mockResolvedValueOnce({ data: { foo: 'bar' } })
    const { result, waitForNextUpdate } = renderHook(() => useFetch('/test-endpoint'))

    expect(result.current).toEqual({ loading: true, data: null, error: false })

    await waitForNextUpdate()

    expect(result.current).toEqual({ loading: false, data: { data: { foo: 'bar' } }, error: false })
  })
})
