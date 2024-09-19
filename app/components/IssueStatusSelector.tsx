"use client"
import { Issue, STATUS } from '@prisma/client'
import { Select } from '@radix-ui/themes'

interface Props {
    issue?: Issue,
    setStatus: ( status: STATUS ) => void,
}

const statuses: { label: string, value: STATUS }[] = [
    { label: 'Open', value: "OPEN" },
    { label: 'Closed', value: "CLOSED" },
    { label: 'In Progress', value: "IN_PROGRESS" },
]

const IssueStatusSelector = ( { issue, setStatus }: Props ) => {

    return (
        <Select.Root
            defaultValue={ issue ? issue.status : "ALL" }
            onValueChange={ ( value: STATUS ) => setStatus( value ) }
        >
            <Select.Trigger />
            <Select.Content >
                <Select.Group>
                    <Select.Label>{ issue ? 'Issue Status' : 'Filter issues by statuses' }</Select.Label>
                    { !issue && <Select.Item value='ALL'>All</Select.Item> }
                    {
                        statuses.map( ( status ) => <Select.Item key={ status.value } value={ status.value } >
                            { status.label }
                        </Select.Item> )
                    }
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusSelector
