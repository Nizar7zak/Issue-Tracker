"use client"
import IssueStatusSelector from '@/app/components/IssueStatusSelector'
import { STATUS } from '@prisma/client'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'

const IssueActions = () => {
    const handleSelectChange = ( status: STATUS | "" ) => {
        console.log( status )
    }
    return (
        <Flex mb='5' justify="between">
            <IssueStatusSelector setStatus={ handleSelectChange } />
            <Button>
                <Link href='/issues/new'>
                    New Issue
                </Link>
            </Button>
        </Flex>
    )
}

export default IssueActions
