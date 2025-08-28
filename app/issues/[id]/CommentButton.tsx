"use client"
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Button, Flex, Popover, TextArea, Text } from '@radix-ui/themes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

const CommentButton = () => {
    const { status, data: session } = useSession()
    const [ comment, setComment ] = useState( '' )
    const [ isOpen, setIsOpen ] = useState( false )
    const params = useParams()
    const queryClient = useQueryClient()

    const addCommentMutation = useMutation( {
        mutationFn: (
            newComment: string
        ) => axios.post(
            `/api/issues/${params.id}/comment`,
            { content: newComment }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries( [ 'comments', params.id ] )
            setComment( '' )
            setIsOpen( false )
            toast.success('Comment added successfully!')
        },
        onError: () => {
            toast.error('Failed to add comment. Please try again.')
        }
    } )

    const handleAddComment = ( newComment: string ) => {
        if (!newComment.trim()) {
            toast.error('Please enter a comment')
            return
        }
        addCommentMutation.mutate( newComment )
    }

    const handleKeyDown = ( event: React.KeyboardEvent ) => {
        if ( event.key === 'Enter' && ( event.metaKey || event.ctrlKey ) ) {
            event.preventDefault()
            handleAddComment( comment )
        }
    }

    if ( status !== "authenticated" ) {
        return null
    }

    return (
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
                <div className="hover-scale transition-transform duration-200">
                    <Button 
                        variant="soft" 
                        size="3"
                        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 dark:from-purple-600 dark:via-pink-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:via-pink-700 dark:hover:to-purple-800 text-white border-0 shadow-lg hover:shadow-xl dark:shadow-purple-900/30 transition-all duration-200 backdrop-blur-sm"
                    >
                        <ChatBubbleIcon width="18" height="18" />
                        <span className="ml-2 font-medium">Add a comment</span>
                    </Button>
                </div>
            </Popover.Trigger>
            <Popover.Content
                width="100%"
                style={ {
                    maxWidth: '600px',
                    width: '90vw',
                } }
                className="animate-fade-in-scale bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-2xl dark:shadow-slate-900/50"
            >
                <div className="p-4">
                    <Flex gap="3" align="start">
                        <Avatar
                            size="3"
                            src={ session.user?.image! }
                            fallback={session.user?.name?.[0] || session.user?.email?.[0] || "U"}
                            radius="full"
                            className="flex-shrink-0 ring-2 ring-slate-200 dark:ring-slate-700"
                        />
                        <Box flexGrow="1" className="space-y-3">
                            <div className="relative">
                                <TextArea
                                    placeholder="Share your thoughts on this issue..."
                                    size="3"
                                    value={ comment }
                                    onChange={ ( event ) => setComment( event.target.value ) }
                                    onKeyDown={handleKeyDown}
                                    className="min-h-[120px] resize-none border-slate-200/60 dark:border-slate-700/60 focus:border-purple-500 dark:focus:border-purple-400 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm placeholder:text-slate-500 dark:placeholder:text-slate-400"
                                    maxLength={1000}
                                />
                                <div className="absolute bottom-2 right-2 text-xs text-slate-400 dark:text-slate-500 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded-full">
                                    {comment.length}/1000
                                </div>
                            </div>
                            <Flex gap="2" justify="between" align="center">
                                <Text size="1" className="text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1 rounded-full">
                                    Press ⌘+Enter to submit
                                </Text>
                                <Flex gap="2">
                                    <Button
                                        variant="soft"
                                        onClick={() => {
                                            setComment('')
                                            setIsOpen(false)
                                        }}
                                        disabled={addCommentMutation.isLoading}
                                        className="hover:bg-slate-100 dark:hover:bg-slate-800"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={ () => handleAddComment( comment ) }
                                        disabled={ addCommentMutation.isLoading || !comment.trim() }
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        { addCommentMutation.isLoading ? (
                                            <Flex align="center" gap="2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Adding...
                                            </Flex>
                                        ) : (
                                            'Post Comment'
                                        ) }
                                    </Button>
                                </Flex>
                            </Flex>
                        </Box>
                    </Flex>
                </div>
            </Popover.Content>
        </Popover.Root>
    )
}

export default CommentButton