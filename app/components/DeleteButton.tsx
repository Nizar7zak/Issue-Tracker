"use client"
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex, Spinner, Text } from '@radix-ui/themes'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteButton = ( { id }: { id: number } ) => {
    const [ error, setError ] = useState( false )
    const [ isDeleting, setDeleting ] = useState( false )
    const router = useRouter()
    const pathName = usePathname()
    const path = pathName.split( '/' ).includes( 'issues' ) ? 'issues' : 'projects'

    const onDelete = async ( id: number ) => {
        try {
            setDeleting( true )
            await axios.delete( `/api/${path}/${id}` )
            router.push( `/${path}/list` )
            router.refresh()
        } catch ( error ) {
            setDeleting( false )
            setError( true )
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red'>
                        <TrashIcon />
                        <Text className='text-nowrap'>
                            Delete { path === 'issues' ? "Issue" : "Project" }
                        </Text>
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Confirm Deletion
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this { path === 'issues' ? "Issue" : "Project" }? This action cannot be undone!
                    </AlertDialog.Description>
                    <Flex mt='3' gap='3'>
                        <AlertDialog.Cancel>
                            <Button color='gray' variant='soft'>
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color='red' onClick={ () => onDelete( id ) } disabled={ isDeleting }>
                                Delete { path === 'issues' ? "Issue" : "Project" }
                                { isDeleting && <Spinner /> }
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={ error }>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Error
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        This { path === 'issues' ? "Issue" : "Project" } could not be deleted
                    </AlertDialog.Description>
                    <Button color='gray' variant='soft' mt='2' onClick={ () => setError( false ) }>
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteButton
