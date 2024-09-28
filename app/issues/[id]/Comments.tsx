"use client"
import { Comment, User } from '@prisma/client'
import { TrashIcon } from '@radix-ui/react-icons'
import { Avatar, Button, Card, Flex, Text } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import CommentButton from './CommentButton'


interface CommentWithUser extends Comment {
    user: User
}

const Comments = () => {
    const { status, data: session } = useSession()

    const params = useParams()
    const router = useRouter()



    const { data: comments, error, isLoading } = useQuery<CommentWithUser[]>( {
        queryKey: [ 'comments', params.id ],
        queryFn: () => axios
            .get<CommentWithUser[]>( `/api/issues/${params.id}/comment` )
            .then( res => res.data ),
    } );

    const deleteComment = async ( id: number ) => {
        try {
            await axios.delete(
                `/api/issues/${params.id}/comment`, { data: { id } }
            )
            router.refresh()
        } catch ( error ) {
            return null
        }
    }

    return (
        <>
            { comments?.length ? <Card className='flex flex-col ' variant='surface' >
                { comments?.map( ( comment ) => <div

                    className='mb-4 border-b-0'
                    key={ comment.id }

                >
                    <Flex align='center'>
                        <Avatar
                            src={ comment.user.image! }
                            fallback="?"
                            size="2"
                            radius="full"
                            className="cursor-pointer"
                        />
                        <Flex
                            className='bg-slate-100 rounded-lg'
                            width='98%'
                            ml='2'
                            justify='between'
                        >
                            <Flex
                                p='1'
                                pl='4'
                                align="start"
                                direction='column'
                                justify='center'
                            >
                                <Text className='font-bold' color="purple" >
                                    { comment.user.name }
                                </Text>
                                <Text>{ comment.content }</Text>
                            </Flex>
                            {
                                session?.user?.email === comment.user.email &&
                                <Button color='red' size='3' m='2' onClick={ () => deleteComment( comment.id ) } >
                                    <TrashIcon width={ 20 } height={ 20 } />
                                </Button>
                            }

                        </Flex>
                    </Flex>
                </div> ) }
            </Card>
                : null
            }
            <CommentButton />
        </>
    )
}

export default Comments
