"use client"
import { Card } from "@radix-ui/themes"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface IssuesCount {
    open: number,
    closed: number,
    inProgress: number
}

interface Props {
    issuesCount: IssuesCount
}

const IssueChart = ( { issuesCount: { open, closed, inProgress } }: Props ) => {
    const data = [
        { label: 'Open', value: open },
        { label: 'Closed', value: closed },
        { label: 'In_Progress', value: inProgress },
    ]
    return (
        <Card>
            <ResponsiveContainer width='100%' height={ 300 }>
                <BarChart data={ data }>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Bar
                        dataKey='value'
                        barSize={ 60 }
                        style={ { fill: 'var(--accent-9)' } }
                    />
                </BarChart>
            </ResponsiveContainer>

        </Card>
    )
}

export default IssueChart
