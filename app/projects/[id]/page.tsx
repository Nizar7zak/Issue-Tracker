import authOptions from "@/app/api/auth/[...nextauth]/authOptions"
import DeleteButton from "@/app/components/DeleteButton"
import EditButton from "@/app/components/EditButton"
import EntryDetails from "@/app/components/EntryDetails"
import { prisma } from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

interface Props {
    params: { id: string }
}

const fetchUser = ( projectId: number ) => {
    return prisma.project.findUnique( {
        where: {
            id: projectId
        }
    } )
}
const ProjectDetailsPage = async ( { params: { id } }: Props ) => {

    const session = await getServerSession( authOptions )

    const project = await fetchUser( parseInt( id ) )
    if ( !project )
        notFound()

    return (
        <Grid columns={ { initial: "1", sm: "5" } } gap='5'>
            <Box className="md:col-span-4">
                <EntryDetails entry={ project } />
            </Box>
            {
                session &&
                <Box>
                    <Flex direction='column' gap='4'>
                        <EditButton id={ project.id } />
                        <DeleteButton id={ project.id } />
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

export default ProjectDetailsPage

export const dynamic = 'force-dynamic'

