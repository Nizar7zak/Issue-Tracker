"use client"
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { CommentWithUser } from './Comments'


interface Props {
    comment: CommentWithUser
}
const DeleteCommentButton = ( { comment }: Props ) => {
    const params = useParams()
    const { status, data: session } = useSession()
    const queryClient = useQueryClient()

    const deleteCommentMutation = useMutation( {
        mutationFn: ( id: number ) => axios.delete(
            `/api/issues/${params.id}/comment`, { data: { id } }
        ),
        onSuccess: () => queryClient.invalidateQueries( [ 'comments', params.id ] )
    } )

    const handleDeleteComment = ( id: number ) => {
        deleteCommentMutation.mutate( id )
    }
    return (
        <>
            {
                session?.user?.email === comment.user.email &&
                <Button color='red' size='3' m='2' onClick={ () => handleDeleteComment( comment.id ) } >
                    <TrashIcon width={ 20 } height={ 20 } />
                </Button>
            }
        </>
    )
}

export default DeleteCommentButton