import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import Comments from '../issues/[id]/Comments'

const EntryDetails = ( { entry }: { entry: Issue } ) => {
    return (
        <div className="space-y-6">
            <div className="animate-fade-in-up">
                <Heading size="6" className="text-slate-900 dark:text-slate-100 mb-4">
                    { entry.title }
                </Heading>
                <Flex gap='4' my='3' align="center">
                    { "status" in entry &&
                        <IssueStatusBadge status={ entry.status } />
                    }
                    <Text className="text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-sm">
                        { entry.createdAt.toDateString() }
                    </Text>
                </Flex>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <Card 
                    className="prose max-w-full dark:prose-invert prose-slate dark:prose-slate prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-code:text-slate-800 dark:prose-code:text-slate-200 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-lg dark:shadow-slate-900/50" 
                    size='4' 
                    mb='5' 
                    variant="surface"
                >
                    <ReactMarkdown>{ entry.description! }</ReactMarkdown>
                </Card>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <Comments />
            </div>
        </div>
    )
}

export default EntryDetails
