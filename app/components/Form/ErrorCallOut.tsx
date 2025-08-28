import { Callout } from "@radix-ui/themes"

const ErrorCallOut = ( { error }: { error: string } ) => {
    return (
        <Callout.Root color="red" className="mb-5">
            <Callout.Text>
                { error }
            </Callout.Text>
        </Callout.Root>
    )
}

export default ErrorCallOut
