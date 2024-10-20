"use client"
import ErrorCallOut from "@/app/components/Form/ErrorCallOut";
import FormTitle from "@/app/components/Form/FormTitle";
import Link from "@/app/components/Link";
import { authSchema } from "@/app/validationSchemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Heading, Separator, Spinner, Text } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { z } from 'zod';

type AutbData = z.infer<typeof authSchema>

interface Props {
    type: "signin" | "register",
}
const AuthForm = ( { type }: Props ) => {
    const [ error, setError ] = useState( '' )
    const [ isSubmitting, setIsSubmitting ] = useState( false )
    const router = useRouter()
    let label = type === "register" ? "Sign Up" : "Sign In"

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AutbData>( {
        resolver: zodResolver( authSchema )
    } )

    const onSubmit = handleSubmit( async ( { email, password } ) => {
        try {
            if ( type === "register" ) {
                setIsSubmitting( true )
                axios.post( '/api/register', { email, password } )
                router.push( '/auth/signin' )
                router.refresh()

            } else {
                setIsSubmitting( true )
                await signIn( 'credentials', {
                    redirect: false,
                    email,
                    password
                } )
                router.push( '/issues/list' )
                router.refresh()
            }

        } catch ( error ) {
            setIsSubmitting( false )
            let ErrorMessage = type === "register" ?
                "User Already Exist" :
                "Invalid Email or Password "
            setError( ErrorMessage )
        }
    } )

    return (
        <Flex
            className="mt-20"
            justify="center"
        >
            <Flex className="md:w-2/5 rounded-2xl bg-indigo-100 p-12" direction="column" gap="3">
                <Heading className="self-center text-indigo-800">
                    { label }
                </Heading>
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
                        { label } with Credentials
                        { isSubmitting && <Spinner /> }
                    </Button>
                    { error && <ErrorCallOut error={ error } /> }

                </form>
                <Separator
                    className="my-0 bg-indigo-700"
                    style={ { height: '1px', width: '100%' } }
                />
                <Button onClick={ () => {
                    signIn( 'google', {
                        callbackUrl: '/issues/list'
                    } )
                }
                }>
                    <FaGoogle />
                    { label } with Google
                </Button>
                <Text>
                    { type === "register" ? "Do you have an account? " : "New tracker? " }
                    <Link href={ type === "register" ? "/auth/signin" : "/auth/signup" }>
                        { type === "register" ? "Login" : "Create an account" }
                    </Link>
                </Text>
            </Flex>
        </Flex>
    );
};

export default AuthForm;
