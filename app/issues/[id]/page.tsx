import authOptions from "@/app/api/auth/[...nextauth]/authOptions"
import { prisma } from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import AssigneeSelect from "./AssigneeSelect"
import DeleteButton from "../../components/DeleteButton"
import EditButton from "../../components/EditButton"
import EntryDetails from "../../components/EntryDetails"

interface Props {
    params: { id: string }
}

const fetchUser = ( issueId: number ) => {
    return prisma.issue.findUnique( {
        where: {
            id: issueId
        }
    } )
}
const IssueDetailsPage = async ( { params: { id } }: Props ) => {

    const session = await getServerSession( authOptions )

    const issue = await fetchUser( parseInt( id ) )
    if ( !issue )
        notFound()

    return (
        <Grid columns={ { initial: "1", sm: "5" } } gap='5'>
            <Box className="md:col-span-4">
                <EntryDetails entry={ issue } />
            </Box>
            {
                session &&
                <Box>
                    <Flex direction='column' gap='4'>
                        <AssigneeSelect issue={ issue } />
                        <EditButton issueId={ issue.id } />
                        <DeleteButton issueId={ issue.id } />
                    </Flex>
                </Box>
            }
        </Grid>
    )
}

export const generateMetadata = async ( { params }: Props ) => {
    const issue = await fetchUser( parseInt( params.id ) )

    return {
        title: issue?.title,
        description: 'Details of issue' + issue?.description,
        keywords: issue?.title.split( ' ' ).concat( [ 'issue', 'bug tracking', 'project management' ] ).join( ', ' ),
        openGraph: {
            title: issue?.title,
            description: issue?.description,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: issue?.title,
            description: issue?.description,
        },
    }
}

export default IssueDetailsPage

export const dynamic = 'force-dynamic'

