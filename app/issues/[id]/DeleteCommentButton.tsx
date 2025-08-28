"use client"
import { TrashIcon } from '@radix-ui/react-icons'
import { Button, AlertDialog, Flex, Text } from '@radix-ui/themes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CommentWithUser } from './Comments'

interface Props {
    comment: CommentWithUser
}

const DeleteCommentButton = ( { comment }: Props ) => {
    const params = useParams()
    const { status, data: session } = useSession()
    const queryClient = useQueryClient()
    const [ isOpen, setIsOpen ] = useState( false )

    const deleteCommentMutation = useMutation( {
        mutationFn: ( id: number ) => axios.delete(
            `/api/issues/${params.id}/comment`, { data: { id } }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries( [ 'comments', params.id ] )
            toast.success('Comment deleted successfully!')
            setIsOpen( false )
        },
        onError: () => {
            toast.error('Failed to delete comment. Please try again.')
        }
    } )

    const handleDeleteComment = ( id: number ) => {
        deleteCommentMutation.mutate( id )
    }

    if ( session?.user?.email !== comment.user.email ) {
        return null
    }

    return (
        <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialog.Trigger>
                <Button 
                    variant="ghost" 
                    color="red" 
                    size="2"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-110 hover:shadow-md"
                >
                    <TrashIcon width={ 16 } height={ 16 } />
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-2xl dark:shadow-slate-900/50">
                <AlertDialog.Title className="text-slate-900 dark:text-slate-100">
                    Delete Comment
                </AlertDialog.Title>
                <AlertDialog.Description className="text-slate-600 dark:text-slate-300">
                    Are you sure you want to delete this comment? This action cannot be undone.
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button 
                            variant="soft" 
                            color="gray"
                            className="hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button 
                            color="red" 
                            onClick={ () => handleDeleteComment( comment.id ) }
                            disabled={ deleteCommentMutation.isLoading }
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            { deleteCommentMutation.isLoading ? (
                                <Flex align="center" gap="2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Deleting...
                                </Flex>
                            ) : (
                                'Delete Comment'
                            ) }
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteCommentButton