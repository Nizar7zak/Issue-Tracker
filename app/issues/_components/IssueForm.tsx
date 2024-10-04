"use client"

import { ErrorMessage } from "@/app/components";
import ErrorCallOut from "@/app/components/Form/ErrorCallOut";
import FormTitle from "@/app/components/Form/FormTitle";
import SubmitButton from "@/app/components/Form/SubmitButton";
import IssueStatusSelector from "@/app/issues/_components/IssueStatusSelector";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue, STATUS } from "@prisma/client";
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

    const handleStatusChange = ( status: STATUS ) => setValue( 'status', status )

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
            { error && <ErrorCallOut error={ error } /> }
            <form
                className="space-y-3"
                onSubmit={ onSubmit } >
                <FormTitle
                    placeholder="Title..."
                    defaultValue={ issue?.title }
                    register={ register( "title" ) }
                    error={ errors.title }
                />

                <Controller
                    name="description"
                    defaultValue={ issue?.description }
                    control={ control }
                    render={ ( { field } ) => <SimpleMDE placeholder="Description" { ...field } /> }
                />
                <ErrorMessage>{ errors.description?.message }</ErrorMessage>

                { issue &&
                    <IssueStatusSelector issue={ issue } setStatus={ handleStatusChange } />
                }
                <SubmitButton isSubmitting={ isSubmitting } isUpdate={ issue?.title } isIssue={ true } />
            </form>
        </div>
    )
}

export default IssueForm