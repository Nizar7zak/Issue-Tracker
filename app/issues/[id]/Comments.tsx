"use client"
import { Comment, User } from '@prisma/client'
import { Avatar, Card, Flex, Text, Separator } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import CommentButton from './CommentButton'
import DeleteCommentButton from './DeleteCommentButton'

export interface CommentWithUser extends Comment {
    user: User
}

const Comments = () => {
    const params = useParams()

    const { data: comments, error, isLoading } = useQuery<CommentWithUser[]>( {
        queryKey: [ 'comments', params.id ],
        queryFn: () => axios
            .get<CommentWithUser[]>( `/api/issues/${params.id}/comment` )
            .then( res => res.data ),
    } )

    if (isLoading) {
        return (
            <div className="animate-fade-in-up">
                <Card className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50" variant="surface">
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 animate-pulse"></div>
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            { comments?.length ? (
                <div className="animate-fade-in-up">
                    <Card className="p-0 overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-lg dark:shadow-slate-900/20" variant="surface">
                        <div className="px-6 py-4 border-b border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-r from-slate-50/80 to-purple-50/80 dark:from-slate-800/80 dark:to-purple-900/20">
                            <Text size="4" weight="bold" className="text-slate-900 dark:text-slate-100">
                                Comments ({comments.length})
                            </Text>
                        </div>
                        <div className="divide-y divide-slate-100/60 dark:divide-slate-800/60">
                            { comments?.map( ( comment, index ) => (
                                <div
                                    key={ comment.id }
                                    className="group animate-fade-in-left p-6 transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 hover:shadow-sm"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <Flex align="start" gap="3">
                                        <Avatar
                                            src={ comment.user.image! }
                                            fallback={comment.user.name?.[0] || comment.user.email?.[0] || "U"}
                                            size="3"
                                            radius="full"
                                            className="flex-shrink-0 ring-2 ring-slate-200 dark:ring-slate-700"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <Flex align="center" gap="2" mb="3">
                                                <Text size="3" weight="bold" className="text-slate-900 dark:text-slate-100">
                                                    { comment.user.name }
                                                </Text>
                                                <Text size="1" className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                                    { formatDistanceToNow( new Date( comment.createdAt ), { addSuffix: true } ) }
                                                </Text>
                                            </Flex>
                                            <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-800/80 dark:to-blue-900/20 rounded-xl p-4 border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
                                                <Text size="2" className="text-slate-700 dark:text-slate-200 leading-relaxed">
                                                    { comment.content }
                                                </Text>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <DeleteCommentButton comment={ comment } />
                                        </div>
                                    </Flex>
                                </div>
                            )) }
                        </div>
                    </Card>
                </div>
            ) : (
                <div className="animate-fade-in-up">
                    <Card className="p-8 text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-lg dark:shadow-slate-900/20" variant="surface">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-purple-100 dark:from-slate-800 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <Text size="3" className="text-slate-700 dark:text-slate-300 mb-2 font-medium">
                            No comments yet
                        </Text>
                        <Text size="2" className="text-slate-500 dark:text-slate-400">
                            Be the first to share your thoughts
                        </Text>
                    </Card>
                </div>
            ) }
            
            <div className="animate-fade-in-up">
                <CommentButton />
            </div>
        </div>
    )
}

export default Comments
