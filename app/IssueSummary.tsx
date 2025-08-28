import { STATUS } from "@prisma/client"
import { Card, Flex, Text } from "@radix-ui/themes"
import { IssueStatusBadge } from "./components"
import Link from "next/link"

interface IssuesCount {
    open: number,
    closed: number,
    inProgress: number
}

interface Props {
    issuesCount: IssuesCount
}

const IssueSummary = ( { issuesCount: { open, closed, inProgress } }: Props ) => {

    const containers: {
        value: number, status: STATUS
    }[] = [
            { value: open, status: "OPEN" },
            { value: closed, status: "CLOSED" },
            { value: inProgress, status: "IN_PROGRESS" }
        ]
    return ( 
        <Flex gap='4'>
            { containers.map( ( container, index ) => (
                <div
                    key={ container.status }
                    className="animate-fade-in-up hover:scale-105 transition-all duration-300 ease-out"
                    style={{ 
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                    }}
                >
                    <Card className="h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-lg dark:shadow-slate-900/20 hover:shadow-xl dark:hover:shadow-slate-900/30 transition-all duration-200">
                        <Flex direction="column" gap='3' p="4">
                            <Link href={ `/issues/list?status=${container.status}` }>
                                <IssueStatusBadge status={ container.status } />
                            </Link>
                            <div className="animate-scale-in" style={{ animationDelay: `${index * 100 + 200}ms` }}>
                                <Text className="font-bold text-3xl text-slate-900 dark:text-slate-100">{ container.value }</Text>
                            </div>
                        </Flex>
                    </Card>
                </div>
            )) }
        </Flex>
    )
}

export default IssueSummary
