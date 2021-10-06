import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'

interface ReturnPayload {
  data: AxiosResponse<any> | null
  loading: boolean
  error: boolean
}

const baseUrl = 'https://my-json-server.typicode.com/benirvingplt'

export const useFetch = (url: string): ReturnPayload => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<AxiosResponse<any> | null>(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    if (url === '') return

    const fetchData = (): void => {
      setLoading(true)
      axios.get(`${baseUrl}${url}`)
        .then((response: AxiosResponse<any>) => {
          setData(response)
        })
        .catch(e => {
          console.log(e)
          setError(true)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    fetchData()
  }, [url])

  return { loading, data, error }
}
