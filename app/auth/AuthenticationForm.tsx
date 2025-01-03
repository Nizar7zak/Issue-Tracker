"use client"
import ErrorCallOut from "@/app/components/Form/ErrorCallOut";
import FormTitle from "@/app/components/Form/FormTitle";
import Link from "@/app/components/Link";
import { authSchema } from "@/app/validationSchemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from 'zod';
import styles from './Form.module.css';
import ConfirmCallOut from "../components/Form/ConfirmCallOut";

type AutbData = z.infer<typeof authSchema>

interface Props {
    type: "signin" | "register",
}
const AuthForm = ( { type }: Props ) => {
    const [ error, setError ] = useState( '' )
    const [ isOk, setIsOk ] = useState( false )
    const [mouseOver, setMouseOver] = useState(false)
    const [ isSubmitting, setIsSubmitting ] = useState( false )
    const router = useRouter()
    const title = type === "register" ? "Create an account" : "Log in to your account"
    const label = type === "register" ? "Sign up" : "Sign in"

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
                setError("")
                await axios.post( '/api/register', { email, password } )
                setIsOk(true)
                await new Promise((resolve) => setTimeout(resolve, 2000));

                router.push( '/auth/signin' )
                router.refresh()

            } else {
                setIsSubmitting( true )
                const result = await signIn( 'credentials', {
                    redirect: false,
                    email,
                    password
                } )
                if(result?.error)
                    throw new Error("Invalid Email or Password")
                router.push( '/' )
                router.refresh()
            }
        } catch ( error ) {
            setIsSubmitting(false);
            const defaultMessage = type === "register" ? 
                "User Already Exist" : 
                "Invalid Email or Password";
            setError(defaultMessage);
        }
    } )

    return (

        <Flex className={ styles.formConatiner } direction="column" width="100%" mt="9" align="center">
            <Heading className="self-center text-zinc-700" mb="5">
                { title }
            </Heading>
            <Button
                onMouseOver={() => {setMouseOver(true)}}
                onMouseOut={() => {setMouseOver(false)}}
                className={ `${styles.btn} ${styles.platformBtn}` }
                onClick={ () => {
                    signIn( 'google', {
                        callbackUrl: '/'
                    } )
                }
                }>
               {mouseOver ? <FcGoogle size={30}/> : <FaGoogle size={27} />}
                { label } with Google
            </Button>

            <div className={ styles.divider }>
                <span>Or continue with email</span>
            </div>

            <form
                className="space-y-5 flex flex-col w-full"
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
                    className={ `${styles.btn} ${styles.formBtn}` }
                    disabled={ isSubmitting }
                >
                    { label }
                    { isSubmitting && <Spinner /> }
                </Button>
                { error && <ErrorCallOut error={ error } /> }

            </form>
            <ConfirmCallOut sucsses={isOk} />

            <Flex gap='1' mt={ "5" }>
                <Text>
                    { type === "register" ? "Already registered? " : "Don't have an account?" }
                </Text>
                <Link href={ type === "register" ? "/auth/signin" : "/auth/signup" } >
                    { type === "register" ? "Sign in" : "Sign up" }
                </Link>
            </Flex>

        </Flex>
    );
};

export default AuthForm;
