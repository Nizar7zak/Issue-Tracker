import { prisma } from '@/prisma/client'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import IssueFormLoading from './loading'

const IssueForm = dynamic(
    () => import( '@/app/issues/_components/IssueForm' ),
    {
        ssr: false,
        loading: () => <IssueFormLoading />
    }
)
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
