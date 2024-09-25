import { IssueStatusBadge, Link } from '@/app/components';
import { Issue, STATUS } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Avatar, Flex, Table, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import NextLink from 'next/link';
import { ExtendedIssue } from './page';

export interface IssueQuery {
    status: STATUS,
    orderBy: keyof Issue,
    page: string,
    pageSize: string,
    assignee: string
}

interface Props {
    issues: ExtendedIssue[],
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
                        <Text className={
                            classNames( {
                                "nav-link": true,
                                "!text-zinc-900": col.value === searchParams.orderBy?.split( "_" )[ 0 ],
                            } )
                        }
                        > { col.value }</Text>

                        <NextLink
                            href={ { query: { ...searchParams, orderBy: col.value + "_asc" } } }>
                            <ArrowUpIcon
                                className="inline"
                                color={ `${col.value === searchParams.orderBy?.split( '_' )[ 0 ] &&
                                    searchParams.orderBy?.split( '_' )[ 1 ] === 'asc' ?
                                    "black" :
                                    "gray"}`
                                } />
                        </NextLink>
                        <NextLink
                            href={ { query: { ...searchParams, orderBy: col.value + "_desc" } } }>
                            <ArrowDownIcon
                                className="inline"
                                color={ `${col.value === searchParams.orderBy?.split( '_' )[ 0 ] &&
                                    searchParams.orderBy?.split( '_' )[ 1 ] === 'desc' ?
                                    "black" :
                                    "gray"}`
                                } />
                        </NextLink>

                    </Table.ColumnHeaderCell> ) }

                    <Table.ColumnHeaderCell className='hidden md:table-cell'>
                        <Text className={ classNames( {
                            "nav-link": true,
                            "!text-zinc-900": "true" === searchParams.assignee
                        } ) }> Assigned to User</Text>
                    </Table.ColumnHeaderCell>
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
                        <Table.Cell className="hidden md:table-cell">
                            { issue.assignedToUser &&
                                <Flex gap='2' align='center'>
                                    <Avatar
                                        src={ issue.assignedToUser.image }
                                        fallback="?"
                                        size='1'
                                        radius='full'
                                    />
                                    <Text >{ issue.assignedToUser.name }</Text>
                                </Flex> }
                        </Table.Cell>

                    </Table.Row>
                ) ) }
            </Table.Body>
        </Table.Root >
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
