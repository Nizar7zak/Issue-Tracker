"use client"
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ( { issueId }: { issueId: number } ) => {
    const [ error, setError ] = useState( false )
    const [ isDeleting, setDeleting ] = useState( false )
    const router = useRouter()

    const onDelete = async ( id: number ) => {
        try {
            setDeleting( true )
            await axios.delete( `/api/issues/${id}` )
            router.push( '/issues/list' )
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
                        Delete Issue
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Confirm Deletion
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this Issue? This action cannot be undone!
                    </AlertDialog.Description>
                    <Flex mt='3' gap='3'>
                        <AlertDialog.Cancel>
                            <Button color='gray' variant='soft'>
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color='red' onClick={ () => onDelete( issueId ) } disabled={ isDeleting }>
                                Delete Issue
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
                        This issue could not be deleted
                    </AlertDialog.Description>
                    <Button color='gray' variant='soft' mt='2' onClick={ () => setError( false ) }>
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
