import { prisma } from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table, Text } from '@radix-ui/themes'
import { IssueStatusBadge } from './components'

const LatestIssues = async () => {

    const issues = await prisma.issue.findMany( {
        orderBy: { "createdAt": "desc" },
        include: {
            assignedToUser: true
        },
        take: 5
    } )

    return (
        <Card>
            <Heading>Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {
                        issues.map( ( issue ) =>
                            <Table.Row key={ issue.id }>
                                <Table.Cell>
                                    <Flex justify='between'>
                                        <Flex direction="column" gap='2' >
                                            <Text>
                                                { issue.title }
                                            </Text>
                                            <IssueStatusBadge status={ issue.status } />
                                        </Flex>
                                        {
                                            issue.assignedToUser &&
                                            <Avatar
                                                src={ issue.assignedToUser.image! }
                                                fallback="?"
                                                size='2'
                                                radius='full'
                                            />
                                        }
                                    </Flex>
                                </Table.Cell>

                            </Table.Row>
                        )
                    }

                </Table.Body>

            </Table.Root>

        </Card>
    )
}

export default LatestIssues
