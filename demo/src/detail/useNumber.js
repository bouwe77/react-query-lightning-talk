import { useQuery } from 'react-query'
import axios from 'axios'
import { useApi } from '../useApi'

export function useNumber(numberId) {
  if (!numberId) throw Error('Please provide a numberId')

  const { numbersUrl } = useApi()

  const result = useQuery(['number', numberId], () =>
    axios.get(numbersUrl + numberId).then((res) => res.data),
  )

  return result
}
