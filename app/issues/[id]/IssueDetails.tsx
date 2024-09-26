import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import Comments from './Comments'

const IssueDetails = ( { issue }: { issue: Issue } ) => {
    return (
        <>
            <Heading>{ issue.title }</Heading>
            <Flex gap='4' my='3'>
                <IssueStatusBadge status={ issue.status } />
                <Text>{ issue.createdAt.toDateString() }</Text>
            </Flex>
            
            <Card className="prose max-w-full" size='4' mb='5' variant="surface">
                <ReactMarkdown>{ issue.description }</ReactMarkdown>
            </Card>
            <Comments />
        </>
    )
}

export default IssueDetails