import IssueStatusSelector from '@/app/issues/_components/IssueStatusSelector'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import FilterByAssigne from '../_components/FilterByAssigne'

const IssueActions = () => {
    return (
        <Flex justify="between">
            <Flex gap='5'>
                <IssueStatusSelector />
                <FilterByAssigne />
            </Flex>
            <Button>
                <Link href='/issues/new'>
                    New Issue
                </Link>
            </Button>
        </Flex>
    )
}

export default IssueActions
