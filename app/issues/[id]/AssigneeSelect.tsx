"use client"
import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Avatar, Select } from '@radix-ui/themes'
import { IssueService } from '@/app/services/issueService'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { UNASSIGNED_VALUE } from '@/app/constants'

const AssigneeSelect = ( { issue }: { issue: Issue } ) => {
    const { data: users, error, isLoading } = useUsers();
    const router = useRouter()
    if ( isLoading ) return <Skeleton height='2rem' />
    if ( error ) return null;

    const assignToUser = async ( userId: string | null ) => {
        try {
            if ( userId === UNASSIGNED_VALUE )
                userId = null
            const result = await IssueService.assignUserToIssue( issue.id, userId )
            if ( result.success ) {
                router.refresh()
            }
        } catch ( error ) {
        }
    }
    return (
        <div className="animate-fade-in-up hover-scale-sm transition-transform duration-200">
            <Select.Root
                defaultValue={ issue.assignedToUserId || UNASSIGNED_VALUE }
                onValueChange={ assignToUser }
            >
                <Select.Trigger>
                    {issue.assignedToUserId && users ? (
                        (() => {
                            const assignedUser = users.find(user => user.id === issue.assignedToUserId);
                            return assignedUser ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Avatar 
                                        src={assignedUser.image || undefined}
                                        fallback={assignedUser.name?.[0] || assignedUser.email?.[0] || "U"}
                                        size="1"
                                    />
                                    <span>{assignedUser.name}</span>
                                </div>
                            ) : (
                                <span>Unassigned</span>
                            );
                        })()
                    ) : (
                        <span>Unassigned</span>
                    )}
                </Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>
                            Suggestions
                        </Select.Label>
                        <Select.Item value={UNASSIGNED_VALUE}>
                            {UNASSIGNED_VALUE}
                        </Select.Item>
                        { users?.map( ( user ) => <Select.Item
                            key={ user.id }
                            value={ user.id }
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Avatar 
                                    src={user.image || undefined}
                                    fallback={user.name?.[0] || user.email?.[0] || "U"}
                                    size="1"
                                />
                                <span>{ user.name }</span>
                            </div>
                        </Select.Item> ) }
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </div>
    )
}

const useUsers = () => useQuery( {
    queryKey: [ 'users' ],
    queryFn: () => axios.get<User[]>( '/api/users' ).then( res => res.data ),
    staleTime: 0,
    retry: 3,
} )

export const dynamic = 'force-dynamic'

export default AssigneeSelect
