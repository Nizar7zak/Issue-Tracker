import { Callout } from '@radix-ui/themes'

const ConfirmCallOut = ( { sucsses }: { sucsses: boolean } ) => {
    return (
        sucsses &&
        <Callout.Root color="green" className="mt-5 w-full">
            <Callout.Text>
                Registration has been completed successfully.
            </Callout.Text>
        </Callout.Root>
    )
}

export default ConfirmCallOut
