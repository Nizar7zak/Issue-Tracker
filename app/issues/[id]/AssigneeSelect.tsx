"use client"
import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ( { issue }: { issue: Issue } ) => {
    const { data: users, error, isLoading } = useUsers();
    if ( isLoading ) return <Skeleton height='2rem' />
    if ( error ) return null;

    const assignToUser = async ( userId: string | null ) => {
        try {
            if ( userId === "Unassigned" )
                userId = null
            await axios.patch(
                `/api/issues/${issue.id}`,
                { assignedToUserId: userId }
            )
        } catch ( error ) {
            toast.error( 'Changes could not be saved.' )
        }
    }
    return (
        <>
            <Select.Root
                defaultValue={ issue.assignedToUserId || "Unassigned" }
                onValueChange={ assignToUser }
            >
                <Select.Trigger />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>
                            Suggestions
                        </Select.Label>
                        <Select.Item value="Unassigned">
                            Unassigned
                        </Select.Item>
                        { users?.map( ( user ) => <Select.Item
                            key={ user.id }
                            value={ user.id }
                        >
                            { user.name }
                        </Select.Item> ) }
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

const useUsers = () => useQuery( {
    queryKey: [ 'users' ],
    queryFn: () => axios.get<User[]>( '/api/users' ).then( res => res.data ),
    staleTime: 60 * 60 * 1000,
    retry: 3,
} )

export default AssigneeSelect
