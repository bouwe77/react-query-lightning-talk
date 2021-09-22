import { useQuery } from 'react-query'
import axios from 'axios'

export function useNumber(numberId) {
  if (!numberId) throw Error('Please provide a numberId')

  const { isLoading, error, data } = useQuery(['number', numberId], () =>
    axios
      .get('http://localhost:8123/numbers/' + numberId)
      .then((res) => res.data),
  )

  return { isLoading, error, number: data }
}
