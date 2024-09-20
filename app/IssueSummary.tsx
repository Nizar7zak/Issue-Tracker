import { STATUS } from "@prisma/client"
import { Card, Flex, Text } from "@radix-ui/themes"
import { IssueStatusBadge } from "./components"
import Link from "next/link"

interface Props {
    open: number,
    closed: number,
    inProgress: number
}

const IssueSummary = ( { open, closed, inProgress }: Props ) => {

    const containers: {
        value: number, status: STATUS
    }[] = [
            { value: open, status: "OPEN" },
            { value: closed, status: "CLOSED" },
            { value: inProgress, status: "IN_PROGRESS" }
        ]
    return ( <Flex gap='4'>
        { containers.map( ( container ) =>
            <Card key={ container.status }>
                <Flex direction="column" gap='3'>
                    <Link href={ `/issues/list?status=${container.status}` }>
                        <IssueStatusBadge status={ container.status } />
                    </Link>
                    <Text className="font-bold">{ container.value }</Text>
                </Flex>
            </Card> ) }
    </Flex>

    )
}

export default IssueSummary
