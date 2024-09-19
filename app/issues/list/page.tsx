import { IssueStatusBadge, Link } from "@/app/components"
import { prisma } from "@/prisma/client"
import { Container, Flex, Table } from "@radix-ui/themes"
import IssueActions from "./IssueActions"
import { Issue, STATUS } from "@prisma/client"
import NextLink from 'next/link'
import { ArrowUpIcon } from "@radix-ui/react-icons"
import Pagination from "@/app/components/Pagination"

interface Props {
    searchParams: {
        status: STATUS,
        orderBy: keyof Issue,
        page: string
    }
}

const IssuesPage = async ( { searchParams }: Props ) => {

    const columns: {
        label: string;
        value: keyof Issue;
        className?: string;
    }[] = [
            { label: 'Issue', value: 'title' },
            { label: 'Status', value: "status", className: "hidden md:table-cell" },
            { label: 'Created At', value: "createdAt", className: "hidden md:table-cell" },
        ]

    const statuses = Object.values( STATUS )

    const status = statuses.includes( searchParams.status ) ?
        searchParams.status :
        undefined;
    const where = { status }

    const orderBy = columns.map( ( col ) => col.value )
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
        <Flex direction='column' gap='5' >
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        { columns.map( ( col ) => <Table.ColumnHeaderCell
                            key={ col.value }
                            className={ col.className }
                        >
                            <NextLink href={ { query: { ...searchParams, orderBy: col.value } } }>
                                { col.label }
                            </NextLink>
                            { col.value === searchParams.orderBy && <ArrowUpIcon className="inline" /> }

                        </Table.ColumnHeaderCell> ) }
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { issues.map( ( issue ) => (
                        <Table.Row key={ issue.id }>

                            <Table.Cell>
                                <Link href={ `/issues/${issue.id}` }>
                                    { issue.title }
                                </Link>
                                <div className="block md:hidden mt-1">
                                    <IssueStatusBadge status={ issue.status } />
                                </div>
                            </Table.Cell>

                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={ issue.status } />
                            </Table.Cell>

                            <Table.Cell className="hidden md:table-cell">
                                { issue.createdAt.toDateString() }
                            </Table.Cell>

                        </Table.Row>
                    ) ) }
                </Table.Body>
            </Table.Root>
            <Pagination
                itemCount={ issueCount }
                pageSize={ pageSize }
                currentPage={ page }
            />
        </Flex>
    )
}

export const dynamic = 'force-dynamic'

export default IssuesPage