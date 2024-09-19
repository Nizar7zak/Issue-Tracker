import IssueStatusSelector from '@/app/issues/_components/IssueStatusSelector'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'

const IssueActions = () => {
    return (
        <Flex mb='5' justify="between">
            <IssueStatusSelector />
            <Button>
                <Link href='/issues/new'>
                    New Issue
                </Link>
            </Button>
        </Flex>
    )
}

export default IssueActions
