import Pagination from "@/app/components/Pagination"
import { prisma } from "@/prisma/client"
import { Issue, STATUS } from "@prisma/client"
import { Flex } from "@radix-ui/themes"
import { Metadata } from "next"
import IssueActions from "./IssueActions"
import IssueTable, { columnsName, IssueQuery } from "./IssueTable"

interface Props {
    searchParams: IssueQuery
}

const IssuesPage = async ( { searchParams }: Props ) => {

    const statuses = Object.values( STATUS )
    const status = statuses.includes( searchParams.status ) ?
        searchParams.status :
        undefined;
    const where = { status }

    const orderType = searchParams.orderBy?.split( '_' )[ 0 ] as keyof Issue;
    const orderHow = searchParams.orderBy?.split( '_' )[ 1 ]

    const orderBy = columnsName
        .includes( orderType ) ?
        { [ orderType ]: orderHow } :
        undefined

    const page = parseInt( searchParams.page ) || 1
    const pageSize = 10

    const issues = await prisma.issue.findMany( {
        where,
        orderBy: { [ orderType ]: orderHow },
        skip: ( page - 1 ) * pageSize,
        take: pageSize
    } )
    const issueCount = await prisma.issue.count( { where } )

    return (
        <Flex direction='column' gap='3' >
            <IssueActions />
            { issueCount ?
                <IssueTable
                    issues={ issues }
                    searchParams={ searchParams }
                /> : null
            }
            <Pagination
                itemCount={ issueCount }
                pageSize={ pageSize }
                currentPage={ page }
            />
        </Flex>
    )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Issue Tracker - Issue List",
    description: "View all of project issuse",
    keywords: "issue tracker, project management, task management, bug tracking",
    openGraph: {
        title: "Issue Tracker - Issue List",
        description: "View all of project issues",
        type: "website",
    }
}

export default IssuesPage