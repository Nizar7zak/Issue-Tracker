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
        <div className="animate-fade-in-up">
            <Table.Root variant="surface" className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-lg dark:shadow-slate-900/20">
                <Table.Header>
                    <Table.Row className="border-b border-slate-200/60 dark:border-slate-700/60">
                        { columns.map( ( col ) => <Table.ColumnHeaderCell
                            key={ col.value }
                            className={ col.className }
                        >
                            <Text className={
                                classNames( {
                                    "nav-link": true,
                                    "!text-zinc-900 dark:!text-zinc-100": col.value === searchParams.orderBy?.split( "_" )[ 0 ],
                                } )
                            }
                            > { col.value }</Text>

                            <NextLink
                                href={ { query: { ...searchParams, orderBy: col.value + "_asc" } } }>
                                <ArrowUpIcon
                                    className={classNames(
                                        "inline transition-colors duration-200",
                                        {
                                            "text-slate-900 dark:text-slate-100": col.value === searchParams.orderBy?.split( '_' )[ 0 ] &&
                                                searchParams.orderBy?.split( '_' )[ 1 ] === 'asc',
                                            "text-slate-400 dark:text-slate-500": !(col.value === searchParams.orderBy?.split( '_' )[ 0 ] &&
                                                searchParams.orderBy?.split( '_' )[ 1 ] === 'asc')
                                        }
                                    )}
                                />
                            </NextLink>
                            <NextLink
                                href={ { query: { ...searchParams, orderBy: col.value + "_desc" } } }>
                                <ArrowDownIcon
                                    className={classNames(
                                        "inline transition-colors duration-200",
                                        {
                                            "text-slate-900 dark:text-slate-100": col.value === searchParams.orderBy?.split( '_' )[ 0 ] &&
                                                searchParams.orderBy?.split( '_' )[ 1 ] === 'desc',
                                            "text-slate-400 dark:text-slate-500": !(col.value === searchParams.orderBy?.split( '_' )[ 0 ] &&
                                                searchParams.orderBy?.split( '_' )[ 1 ] === 'desc')
                                        }
                                    )}
                                />
                            </NextLink>

                        </Table.ColumnHeaderCell> ) }

                        <Table.ColumnHeaderCell className='hidden md:table-cell'>
                            <Text className={ classNames( {
                                "nav-link": true,
                                "!text-zinc-900 dark:!text-zinc-100": "true" === searchParams.assignee
                            } ) }> Assigned to User</Text>
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { issues.map( ( issue, index ) => (
                        <Table.Row 
                            key={ issue.id }
                            className="animate-fade-in-left transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 border-b border-slate-100/60 dark:border-slate-800/60"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
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
                                <Text className="text-slate-700 dark:text-slate-300">
                                    { issue.createdAt.toDateString() }
                                </Text>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                { issue.assignedToUser &&
                                    <Flex gap='2' align='center'>
                                        <Avatar
                                            src={ issue.assignedToUser.image }
                                            fallback={issue.assignedToUser.name?.[0] || "U"}
                                            size='1'
                                            radius='full'
                                            className="ring-2 ring-slate-200 dark:ring-slate-700"
                                        />
                                        <Text className="text-slate-700 dark:text-slate-300">{ issue.assignedToUser.name }</Text>
                                    </Flex> }
                            </Table.Cell>
                        </Table.Row>
                    ) ) }
                </Table.Body>
            </Table.Root >
        </div>
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
