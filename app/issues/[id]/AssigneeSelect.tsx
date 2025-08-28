"use client"
import { Skeleton } from '@/app/components'
import { Issue } from '@prisma/client'
import { Avatar, Select } from '@radix-ui/themes'
import { IssueService } from '@/app/services/issueService'
import { useRouter } from 'next/navigation'
import { UNASSIGNED_VALUE } from '@/app/constants'
import { useUsers } from '@/app/hooks/useUsers'

const AssigneeSelect = ( { issue }: { issue: Issue } ) => {
    const { data: users, error, isLoading, invalidateUsers } = useUsers();
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
                invalidateUsers()
            }
        } catch ( error ) {
        }
    }

    const getUserDisplayName = (user: any) => {
        if (user.name) return user.name;
        if (user.email) {
            const emailPrefix = user.email.split('@')[0];
            return emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
        }
        return 'Unknown User';
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
                                    <span>{getUserDisplayName(assignedUser)}</span>
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
                                <span>{ getUserDisplayName(user) }</span>
                            </div>
                        </Select.Item> ) }
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </div>
    )
}

export const dynamic = 'force-dynamic'

export default AssigneeSelect
