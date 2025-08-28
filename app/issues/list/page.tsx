import PageSizeDropDown from "@/app/components/PageSizeDropDown"
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
export interface ExtendedIssue extends Issue {
    assignedToUser?: {
        id: string;
        name: string;
        image: string
    } | null;
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
    const pageSize = parseInt( searchParams.pageSize ) || 10;

    const issues = searchParams.assignee ?
        await prisma.issue.findMany( {
            where: {
                status, assignedToUser: { is: {} }
            },
            orderBy,
            skip: ( page - 1 ) * pageSize,
            take: pageSize,
            include: {
                assignedToUser: true
            }
        } ) as ExtendedIssue[] :
        await prisma.issue.findMany( {
            where,
            orderBy,
            skip: ( page - 1 ) * pageSize,
            take: pageSize,
            include: {
                assignedToUser: true
            }
        } ) as ExtendedIssue[];

    const issueCount = searchParams.assignee ? await prisma.issue.count( {
        where: {
            status, assignedToUser: { is: {} }
        },
    } ) : await prisma.issue.count( { where } )

    return (
        <Flex direction='column' gap='5' >
            <IssueActions />
            { issueCount ? (
                <IssueTable
                    issues={ issues }
                    searchParams={ searchParams }
                />
            ) : null }

            <Flex justify="between">
                <Pagination
                    itemCount={ issueCount }
                    pageSize={ pageSize }
                    currentPage={ page }
                />
                <PageSizeDropDown />
            </Flex>
        </Flex>
    )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Issue Tracker - Issue List",
    description: "View all of project issues",
    keywords: "issue tracker, project management, task management, bug tracking",
    openGraph: {
        title: "Issue Tracker - Issue List",
        description: "View all of project issues",
        type: "website",
    }
}

export default IssuesPage
