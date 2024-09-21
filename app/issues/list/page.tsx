import Pagination from "@/app/components/Pagination"
import { prisma } from "@/prisma/client"
import { STATUS } from "@prisma/client"
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

    const orderBy = columnsName
        .includes( searchParams.orderBy ) ?
        { [ searchParams.orderBy ]: "asc" } :
        undefined

    const page = parseInt( searchParams.page ) || 1
    const pageSize = 10

    const issues = await prisma.issue.findMany( {
        where,
        orderBy,
        skip: ( page - 1 ) * pageSize,
        take: pageSize
    } )
    const issueCount = await prisma.issue.count( { where } )

    return (
        <Flex direction='column' gap='3' >
            <IssueActions />
            <IssueTable
                issues={ issues }
                searchParams={ searchParams }
            />
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