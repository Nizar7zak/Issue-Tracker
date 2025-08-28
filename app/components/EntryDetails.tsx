import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import Comments from '../issues/[id]/Comments'

const EntryDetails = ( { entry }: { entry: Issue } ) => {
    return (
        <>
            <Heading>{ entry.title }</Heading>
            <Flex gap='4' my='3'>
                { "status" in entry &&
                    <IssueStatusBadge status={ entry.status } />
                }
                <Text>{ entry.createdAt.toDateString() }</Text>
            </Flex>
            <Card className="prose max-w-full" size='4' mb='5' variant="surface">
                <ReactMarkdown>{ entry.description! }</ReactMarkdown>
            </Card>
            <Comments />
        </>
    )
}

export default EntryDetails
