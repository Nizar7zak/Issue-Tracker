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

    // console.log( project )

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
    const project = await fetchUser( parseInt( params.id ) )

    return {
        title: project?.title,
        description: 'Details of project' + project?.description,
        keywords: project?.title.split( ' ' ).concat( [ 'project', 'bug tracking', 'project management' ] ).join( ', ' ),
        openGraph: {
            title: project?.title,
            description: project?.description,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: project?.title,
            description: project?.description,
        },
    }
}

export default ProjectDetailsPage

export const dynamic = 'force-dynamic'

