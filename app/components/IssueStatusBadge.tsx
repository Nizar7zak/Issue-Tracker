import { STATUS } from "@prisma/client"
import { Badge } from "@radix-ui/themes"

const IssueMap: Record<
    STATUS,
    { label: string, color: "red" | "violet" | "green" }
> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' },
}

const IssueStatusBadge = ( { status }: { status: STATUS } ) => {
    return (
        <Badge color={ IssueMap[ status ].color }>{ IssueMap[ status ].label }</Badge>
    )
}

export default IssueStatusBadge
