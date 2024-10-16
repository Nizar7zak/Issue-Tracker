"use client"
import ErrorCallOut from "@/app/components/Form/ErrorCallOut";
import FormTitle from "@/app/components/Form/FormTitle";
import { authSchema } from "@/app/validationSchemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Heading, Separator, Spinner } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { FaGoogle } from "react-icons/fa";

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
        <Flex
            className="mt-20"
            justify="center"
        >
            <Flex className="w-2/5 rounded-2xl bg-indigo-100 p-12" direction='column' gap='3'>
                <Heading className="self-center text-indigo-800">Sign In</Heading>
                <form
                    className="space-y-3 flex flex-col"
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
                        className="self-stretch"
                        disabled={ isSubmitting }
                    >
                        Sign in with Credentials
                        { isSubmitting && <Spinner /> }
                    </Button>
                    { error && <ErrorCallOut error={ error } /> }

                </form>
                <Separator
                    className="my-0.5 bg-indigo-700"
                    style={ { height: '2px', width: '100%' } }
                />
                <Button onClick={ () => {
                    signIn( 'google', {
                        callbackUrl: '/issues/list'
                    } )
                }
                }>
                    <FaGoogle />
                    Sign in with Google
                </Button>
            </Flex>
        </Flex>
    );
};

export default SignIn;
