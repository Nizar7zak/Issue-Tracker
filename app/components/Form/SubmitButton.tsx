import { Button, Spinner } from '@radix-ui/themes'

interface Props {
    isSubmitting: boolean,
    isUpdate?: string,
    isIssue: boolean,
}

const SubmitButton = ( { isSubmitting, isUpdate, isIssue }: Props ) => {
    return (
        <Button ml='4' disabled={ isSubmitting }>
            {
                isUpdate ?
                    isIssue ? 'Update Issue' : 'Update Project' :
                    isIssue ? 'Submit New Issue' : 'Submit New Project' }
            { " " }
            { isSubmitting && <Spinner /> }
        </Button>
    )
}

export default SubmitButton
