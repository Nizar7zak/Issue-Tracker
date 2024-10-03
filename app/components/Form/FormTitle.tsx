import { TextField } from "@radix-ui/themes";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type TitleInputProps = {
    defaultValue?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    placeholder: string
};

const FormTitle = ( { defaultValue, register, error, placeholder }: TitleInputProps ) => {
    return (
        <>
            <TextField.Root defaultValue={ defaultValue } { ...register } placeholder={ placeholder } />
            { error && <ErrorMessage>{ error.message }</ErrorMessage> }
        </>
    )
}

export default FormTitle