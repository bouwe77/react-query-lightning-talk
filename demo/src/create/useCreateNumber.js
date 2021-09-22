import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useApi } from '../useApi'

export function useCreateNumber() {
  const queryClient = useQueryClient()
  const { numbersUrl } = useApi()

  const mutation = useMutation(
    (newNumber) => axios.post(numbersUrl, newNumber),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('numbers')
      },
    },
  )

  return { ...mutation, createNumber: mutation.mutate }
}
