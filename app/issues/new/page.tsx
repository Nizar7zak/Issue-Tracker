"use client"

import { Button, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form'
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {

    const { register, control, handleSubmit } = useForm<IssueForm>()
    const router = useRouter()

    const postNewIssue = async ( newIssue: IssueForm ) => {
        await axios.post( '/api/issues', newIssue )
        router.push( '/issues' )
    }

    return (
        <form
            className="max-w-xl space-y-3"
            onSubmit={ handleSubmit( async ( data ) => postNewIssue( data ) ) } >
            <TextField.Root placeholder="Title" { ...register( "title" ) } />
            <Controller
                name="description"
                control={ control }
                render={ ( { field } ) => <SimpleMDE placeholder="Description" { ...field } /> }
            />

            <Button>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage