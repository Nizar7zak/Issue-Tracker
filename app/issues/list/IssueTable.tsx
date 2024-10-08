import { IssueStatusBadge, Link } from '@/app/components';
import { Issue, STATUS } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';

export interface IssueQuery {
    status: STATUS,
    orderBy: keyof Issue,
    page: string
}

interface Props {
    issues: Issue[],
    searchParams: IssueQuery
}

const IssueTable = ( { issues, searchParams }: Props ) => {

    return (
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
    )
}

const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
}[] = [
        { label: 'Issue', value: 'title' },
        { label: 'Status', value: "status", className: "hidden md:table-cell" },
        { label: 'Created At', value: "createdAt", className: "hidden md:table-cell" },
    ]
export const columnsName = columns.map( ( col ) => col.value )


export default IssueTable
