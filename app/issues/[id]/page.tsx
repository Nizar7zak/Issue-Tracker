import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import { prisma } from "@/prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import { notFound } from "next/navigation"


const IssueDetailsPage = async ( { params: { id } }: { params: { id: string } } ) => {

    const issue = await prisma.issue.findUnique( {
        where: {
            id: parseInt( id )
        }
    } )

    if ( !issue )
        notFound()

    return (
        <div>
            <Heading>{ issue.title }</Heading>
            <Flex gap='4' my='3'>
                <IssueStatusBadge status={ issue.status } />
                <Text>{ issue.createdAt.toDateString() }</Text>
            </Flex>
            <Card>
                <p>{ issue.description }</p>
            </Card>
        </div>
    )
}

export default IssueDetailsPage
