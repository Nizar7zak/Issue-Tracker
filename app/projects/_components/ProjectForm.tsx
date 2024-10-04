"use client"

import { ErrorMessage } from "@/app/components";
import ErrorCallOut from "@/app/components/Form/ErrorCallOut";
import FormTitle from "@/app/components/Form/FormTitle";
import SubmitButton from "@/app/components/Form/SubmitButton";
import { projectSchema } from "@/app/validationSchemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

type ProjectFormData = z.infer<typeof projectSchema>

const ProjectForm = ( { project }: { project?: Project } ) => {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ProjectFormData>( {
    resolver: zodResolver( projectSchema ),

  } )

  const router = useRouter()
  const [ error, setError ] = useState( "" )
  const [ isSubmitting, setIsSubmitting ] = useState( false )


  const onSubmit = handleSubmit( async ( data ) => {
    try {
      setIsSubmitting( true )
      if ( project )
        await axios.patch( `/api/projects/${project.id}`, data )
      else
        await axios.post( '/api/projects', data )
      router.push( '/projects/list' )
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
          defaultValue={ project?.title }
          register={ register( "title" ) }
          error={ errors.title }
        />

        <Controller
          name="description"
          defaultValue={ project?.description! }
          control={ control }
          render={ ( { field } ) => <SimpleMDE placeholder="Description" { ...field } /> }
        />
        <ErrorMessage>{ errors.description?.message }</ErrorMessage>

        <SubmitButton isSubmitting={ isSubmitting } isIssue={ false } />
      </form>
    </div>
  )
}

export default ProjectForm