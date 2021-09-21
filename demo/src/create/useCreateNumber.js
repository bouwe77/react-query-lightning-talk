import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export function useCreateNumber() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newNumber) => axios.post('http://localhost:8123/numbers', newNumber),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('numbers')
      },
    },
  )

  return { createNumber: mutation.mutate }
}
