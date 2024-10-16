import { TextField } from "@radix-ui/themes";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type TitleInputProps = {
    defaultValue?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    placeholder: string;
    type?: "password" | "text"
};

const FormTitle = ( {
    defaultValue, register, error, placeholder, type = 'text' }: TitleInputProps ) => {
    return (
        <>
            <TextField.Root
                defaultValue={ defaultValue }
                { ...register }
                placeholder={ placeholder }
                type={ type }
            />
            { error && <ErrorMessage>{ error.message }</ErrorMessage> }
        </>
    )
}

export default FormTitle