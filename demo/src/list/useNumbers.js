import { useQuery } from 'react-query'
import axios from 'axios'
import { useApi } from '../useApi'

export function useNumbers() {
  const { numbersUrl } = useApi()

  const { isLoading, error, data } = useQuery('numbers', () =>
    axios.get(numbersUrl).then((res) => res.data),
  )

  return { isLoading, error, numbers: data }
}
