import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueForm from '../../_components/IssueForm'

const EditIssuePage = async ( { params: { id } }: { params: { id: string } } ) => {
    const issue = await prisma.issue.findUnique( {
        where: {
            id: parseInt( id )
        }
    } )
    if ( !issue ) notFound()

    return (
        <>
            <IssueForm issue={ issue } />
        </>
    )
}

export default EditIssuePage
