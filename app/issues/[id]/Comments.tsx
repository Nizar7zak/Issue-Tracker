"use client"
import { Comment, User } from '@prisma/client'
import { Avatar, Card, Flex, Text } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
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
    } );

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
                            <DeleteCommentButton comment={ comment } />

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
