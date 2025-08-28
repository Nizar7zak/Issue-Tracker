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
        <div className="space-y-2 w-full">
            <TextField.Root
                defaultValue={ defaultValue }
                { ...register }
                placeholder={ placeholder }
                type={ type }
                className={`w-full h-12 px-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-200 ${
                    error ? 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20' : ''
                }`}
            />
            { error && <ErrorMessage>{ error.message }</ErrorMessage> }
        </div>
    )
}

export default FormTitle
