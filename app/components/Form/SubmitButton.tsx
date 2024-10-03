import { Button, Spinner } from '@radix-ui/themes'

interface Props {
    isSubmitting: boolean,
    isIssue: boolean,
}

const SubmitButton = ( { isSubmitting, isIssue }: Props ) => {
    return (
        <Button ml='4' disabled={ isSubmitting }>
            {
                isIssue ?
                    'Update Issue' :
                    'Submit New Issue' }
            { " " }
            { isSubmitting && <Spinner /> }
        </Button>
    )
}

export default SubmitButton