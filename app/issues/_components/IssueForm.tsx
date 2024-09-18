"use client"

import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue, STATUS } from "@prisma/client";
import { Box, Button, Callout, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>


const IssueForm = ( { issue }: { issue?: Issue } ) => {

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IssueFormData>( {
        resolver: zodResolver( issueSchema ),
        defaultValues: {
            status: issue?.status || "OPEN"
        }
    } )

    const router = useRouter()
    const [ error, setError ] = useState( "" )
    const [ isSubmitting, setIsSubmitting ] = useState( false )

    const onSubmit = handleSubmit( async ( data ) => {
        try {
            setIsSubmitting( true )
            if ( issue )
                await axios.patch( `/api/issues/${issue.id}`, data )
            else
                await axios.post( '/api/issues', data )
            router.push( '/issues/list' )
            router.refresh()
        } catch ( error ) {
            setIsSubmitting( false )
            setError( "An unexpected error accurred" )
        }
    } )

    return (
        <div className="max-w-xl">
            { error &&
                <Callout.Root color="red" className="mb-5">
                    <Callout.Text>
                        { error }
                    </Callout.Text>
                </Callout.Root> }
            <form
                className="space-y-3"
                onSubmit={ onSubmit } >
                <TextField.Root defaultValue={ issue?.title } placeholder="Title" { ...register( "title" ) } />
                <ErrorMessage>{ errors.title?.message }</ErrorMessage>

                <Controller
                    name="description"
                    defaultValue={ issue?.description }
                    control={ control }
                    render={ ( { field } ) => <SimpleMDE placeholder="Description" { ...field } /> }
                />
                <ErrorMessage>{ errors.description?.message }</ErrorMessage>

                { issue &&
                    <Box display='block'>

                        <Select.Root
                            defaultValue={ issue.status }
                            onValueChange={ ( value: STATUS ) => setValue( 'status', value ) }
                        >
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Group>
                                    <Select.Label>Issue Status</Select.Label>
                                    <Select.Item value="OPEN">Open</Select.Item>
                                    <Select.Item value="CLOSED">Closed</Select.Item>
                                    <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    </Box>
                }

                <Button disabled={ isSubmitting }>
                    { issue ? 'Update Issue' : 'Submit New Issue' }{ " " }{ isSubmitting && <Spinner /> }
                </Button>
            </form>
        </div>
    )
}

export default IssueForm