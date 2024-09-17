import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'

const DeleteIssueButton = ( { issueId }: { issueId: number } ) => {
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
                        <Button color='red'>
                            <Link href={ `/issues/${issueId}/delete` }>
                                Delete Issue
                            </Link>
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteIssueButton
