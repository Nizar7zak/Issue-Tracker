"use client"
import { Card } from "@radix-ui/themes"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts'

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
        { label: 'Open', value: open, color: '#ef4444' },
        { label: 'Closed', value: closed, color: '#22c55e' },
        { label: 'In Progress', value: inProgress, color: '#8b5cf6' },
    ]

    return (
        <div className="animate-fade-in-scale">
            <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-lg dark:shadow-slate-900/20">
                <ResponsiveContainer width='100%' height={ 300 }>
                    <BarChart data={ data }>
                        <XAxis 
                            dataKey="label" 
                            tick={{ fill: '#64748b' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                            tickLine={{ stroke: '#e2e8f0' }}
                        />
                        <YAxis 
                            tick={{ fill: '#64748b' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                            tickLine={{ stroke: '#e2e8f0' }}
                        />
                        <Bar
                            dataKey='value'
                            barSize={ 60 }
                            radius={[4, 4, 0, 0]}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}

export default IssueChart
