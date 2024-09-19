"use client"
import { Issue, STATUS } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    issue?: Issue,
    setStatus?: ( status: STATUS ) => void,
}

const statuses: { label: string, value: STATUS }[] = [
    { label: 'Open', value: "OPEN" },
    { label: 'Closed', value: "CLOSED" },
    { label: 'In Progress', value: "IN_PROGRESS" },
]

const IssueStatusSelector = ( { issue, setStatus }: Props ) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const handleSelectChange = ( status: STATUS | "ALL" | "" ) => {

        if ( status === "ALL" )
            status = ""

        const params = new URLSearchParams()
        if ( status )
            params.append( 'status', status )
        if ( searchParams.get( 'orderBy' ) )
            params.append( 'orderBy', searchParams.get( 'orderBy' )! )

        const query = params.size ? '?' + params.toString() : ''
        router.push( `/issues/list${query}` )
    }

    return (
        <Select.Root
            defaultValue={ issue ? issue.status : searchParams.get( 'status' ) || "ALL" }
            onValueChange={
                setStatus ?
                    ( value: STATUS ) => setStatus( value ) :
                    ( value: STATUS | "ALL" ) => handleSelectChange( value ) }
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
