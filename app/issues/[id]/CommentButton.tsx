"use client"
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Button, Flex, Popover, TextArea } from '@radix-ui/themes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const CommentButton = () => {
    const { status, data: session } = useSession()
    const [ comment, setComment ] = useState( '' )
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
            queryClient.invalidateQueries( [ 'comments', params.id ] );
            setComment( '' )
        },

    } );
    const handleAddComment = ( newComment: string ) => {
        addCommentMutation.mutate( newComment );
    };

    return (
        <>
            { status === "authenticated" &&
                <Popover.Root>
                    <Popover.Trigger>
                        <Button variant="soft" m='4'>
                            <ChatBubbleIcon width="16" height="16" />
                            Comment
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content
                        width="100%"
                        style={ {
                            maxWidth: '780px',
                            width: '70vw',
                        } }
                    >
                        <Flex gap="3">
                            <Avatar
                                size="3"
                                src={ session.user?.image! }
                                fallback="?"
                                radius="full"
                            />
                            <Box flexGrow="1">
                                <TextArea
                                    placeholder="Write a comment…"
                                    size='3'
                                    value={ comment }
                                    onChange={ ( event ) => setComment( event.target.value ) } />
                                <Popover.Close>
                                    <Button
                                        mt='2'
                                        onClick={ () => handleAddComment( comment ) }
                                    >Comment</Button>
                                </Popover.Close>
                            </Box>
                        </Flex>
                    </Popover.Content>
                </Popover.Root>
            }
        </>
    )
}

export default CommentButton