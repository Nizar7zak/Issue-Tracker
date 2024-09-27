"use client"
import { Comment, User } from '@prisma/client'
import { ChatBubbleIcon, TrashIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Button, Card, Flex, Popover, Text, TextArea } from '@radix-ui/themes'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


interface CommentWithUser extends Comment {
    user: User
}


const Comments = () => {
    const [ comment, setComment ] = useState( '' )
    const [ error, setError ] = useState( '' )
    const { status, data: session } = useSession()
    const params = useParams()
    const [ comments, setComments ] = useState<CommentWithUser[]>()
    const router = useRouter()

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

    const deleteComment = async ( id: number ) => {
        try {
            await axios.delete(
                `http://localhost:3000/api/issues/${params.id}/comment`, { data: { id } }
            )
            router.refresh()

        } catch ( error ) {
            return null
        }
    }

    const postComment = () => {

    }

    useEffect( () => {
        getComments()
    }, [] )

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
                                <Button color='red' size='4' onClick={ () => deleteComment( comment.id ) } >
                                    <TrashIcon width={ 20 } height={ 20 } />
                                </Button>
                            }

                        </Flex>
                    </Flex>
                </div> ) }
            </Card>
                : null
            }
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
                                    readOnly={ false }
                                    placeholder="Write a comment…"
                                    size='3'
                                    value={ comment }
                                    onChange={ ( event ) => setComment( event.target.value ) } />
                                <Popover.Close>
                                    <Button
                                        mt='2'
                                        onClick={ postComment }
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

export default Comments