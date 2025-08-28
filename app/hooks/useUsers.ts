import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { User } from '@prisma/client'

export const useUsers = () => {
    const queryClient = useQueryClient()
    
    const query = useQuery({
        queryKey: ['users'],
        queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
        staleTime: 0,
        retry: 3,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    })

    const invalidateUsers = () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
    }

    return {
        ...query,
        invalidateUsers,
    }
}
