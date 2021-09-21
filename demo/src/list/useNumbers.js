import { useQuery } from 'react-query'
import axios from 'axios'

export function useNumbers() {
  const { isLoading, error, data } = useQuery('numbers', () =>
    axios.get('http://localhost:8123/numbers').then((res) => res.data),
  )

  return { isLoading, error, numbers: data }
}
