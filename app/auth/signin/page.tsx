"use client"
import ErrorCallOut from "@/app/components/Form/ErrorCallOut";
import FormTitle from "@/app/components/Form/FormTitle";
import { authSchema } from "@/app/validationSchemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Heading, Spinner } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';

type SignInData = z.infer<typeof authSchema>

const SignIn = () => {
    const [ error, setError ] = useState( '' )
    const [ isSubmitting, setIsSubmitting ] = useState( false )
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInData>( {
        resolver: zodResolver( authSchema )
    } )

    const onSubmit = handleSubmit( async ( { email, password } ) => {
        try {
            setIsSubmitting( true )
            await signIn( 'credentials', {
                redirect: false,
                email,
                password
            } )
            router.push( '/issues/list' )
            router.refresh()

        } catch ( error ) {
            setIsSubmitting( false )
            setError( "Username or Password is incorrect" )
        }
    } )

    return (
        <div>
            <Heading>Sign In</Heading>
            <Button onClick={ () => {
                signIn( 'google', {
                    callbackUrl: '/issues/list'
                } )
            }
            }>
                Sign in with Google
            </Button>

            <form
                className="space-y-3"
                onSubmit={ onSubmit }
            >
                <FormTitle
                    placeholder="Email"
                    register={ register( "email" ) }
                    error={ errors.email }
                />
                <FormTitle
                    placeholder="Password"
                    register={ register( "password" ) }
                    error={ errors.password }
                    type="password"
                />
                <Button
                    type="submit"
                    disabled={ isSubmitting }
                >
                    Sign in with Credentials
                    { isSubmitting && <Spinner /> }
                </Button>
                { error && <ErrorCallOut error={ error } /> }

            </form>
        </div>
    );
};

export default SignIn;
