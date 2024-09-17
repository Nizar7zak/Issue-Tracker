"use client"
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteIssueButton = ( { issueId }: { issueId: number } ) => {

    const router = useRouter()

    const onDelete = ( id: number ) => {
        axios.delete( `/api/issues/${id}` )
        router.push( '/issues' )
        router.refresh()
    }

    return (
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
                        <Button color='red' onClick={ () => onDelete( issueId ) }>
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteIssueButton
