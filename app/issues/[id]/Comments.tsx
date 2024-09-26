"use client"
import { Comment, User } from '@prisma/client'
import { Avatar, Card, Flex, Text } from '@radix-ui/themes'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'


interface CommentWithUser extends Comment {
    user: User
}


const Comments = () => {
    const params = useParams()
    const [ comments, setComments ] = useState<CommentWithUser[]>()

    const getComments = async () => {
        try {
            const res = await axios.get<CommentWithUser[]>(
                `http://localhost:3000/api/issues/${params.id}/comment`
            )
            setComments( res.data )
        } catch ( error ) {
            return null
        }
    }

    useEffect( () => {
        getComments()
    }, [] )

    if ( !comments?.length )
        return null

    return (
        <Card className='flex flex-col ' variant='surface' >
            { comments?.map( ( comment ) => <div
                className='mb-4'
                key={ comment.id }

            >
                <Flex align='center'>
                    <Avatar
                        src={ comment.user.image! }
                        fallback="?"
                        size="4"
                        radius="full"
                        className="cursor-pointer"
                    />
                    <Flex
                        className='bg-slate-100 rounded-full'
                        width='98%'
                        p='1'
                        pl='4'
                        align="start"
                        direction='column'
                        ml='2'
                        justify='center'
                    >
                        <Text color="purple" >
                            { comment.user.name }
                        </Text>
                        <Text>{ comment.content }</Text>
                    </Flex>
                </Flex>
            </div> ) }
        </Card>
    )
}

export default Comments