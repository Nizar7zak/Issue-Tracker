import { prisma } from '@/prisma/client'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import ProjectFormLoading from './loading'

const ProjectForm = dynamic(
    () => import( '@/app/projects/_components/ProjectForm' ),
    {
        ssr: false,
        loading: () => <ProjectFormLoading />
    }
)
const EditProjectPage = async ( { params: { id } }: { params: { id: string } } ) => {
    const project = await prisma.project.findUnique( {
        where: {
            id: parseInt( id )
        }
    } )
    if ( !project ) notFound()

    return (
        <>
            <ProjectForm project={ project } />
        </>
    )
}

export default EditProjectPage
