import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useApi } from '../useApi'

export function useDeleteNumber(numberId) {
  const queryClient = useQueryClient()
  const { numbersUrl } = useApi()

  const mutation = useMutation(() => axios.delete(numbersUrl + numberId), {
    onSuccess: () => {
      queryClient.invalidateQueries('numbers')
    },
  })

  return mutation
}
