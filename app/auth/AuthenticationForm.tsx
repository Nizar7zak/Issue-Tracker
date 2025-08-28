"use client"
import ErrorCallOut from "@/app/components/Form/ErrorCallOut";
import FormTitle from "@/app/components/Form/FormTitle";
import Link from "next/link";
import { authSchema } from "@/app/validationSchemas";
import { AuthService } from "@/app/services/authService";
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, Spinner, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from 'zod';
import ConfirmCallOut from "../components/Form/ConfirmCallOut";
import { useQueryClient } from '@tanstack/react-query';

type AutbData = z.infer<typeof authSchema>

interface Props {
    type: "signin" | "register",
}
const AuthForm = ({ type }: Props) => {
    const [error, setError] = useState('')
    const [isOk, setIsOk] = useState(false)
    const [mouseOver, setMouseOver] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()
    const title = type === "register" ? "Create an account" : "Log in to your account"
    const label = type === "register" ? "Sign up" : "Sign in"

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AutbData>({
        resolver: zodResolver(authSchema)
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            setError("")
            
            if (type === "register") {
                const result = await AuthService.registerUser({ 
                    name: data.name,
                    email: data.email, 
                    password: data.password 
                })
                if (result.success) {
                    queryClient.invalidateQueries({ queryKey: ['users'] })
                    setIsOk(true)
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    router.push('/auth/signin')
                    router.refresh()
                } else {
                    setError(result.error || "Registration failed")
                }
            } else {
                const result = await AuthService.signInUser({ email: data.email, password: data.password })
                if (result.success) {
                    router.push('/')
                    router.refresh()
                } else {
                    setError(result.error || "Sign in failed")
                }
            }
        } catch (error) {
            const defaultMessage = type === "register" ?
                "User Already Exist" :
                "Invalid Email or Password";
            setError(defaultMessage);
        } finally {
            setIsSubmitting(false);
        }
    })

    return (
        <Box style={{ width: '100%' }}>
            <Flex direction="column" gap="6" style={{ width: '100%' }}>
                <form
                    onSubmit={onSubmit}
                    style={{ width: '100%' }}
                >
                    <Flex direction="column" gap="5" style={{ width: '100%' }}>
                        {type === "register" && (
                            <Box>
                                <FormTitle
                                    placeholder="Enter your full name"
                                    register={register("name")}
                                    error={errors.name}
                                />
                            </Box>
                        )}

                        <Box>
                            <FormTitle
                                placeholder="Enter your email"
                                register={register("email")}
                                error={errors.email}
                            />
                        </Box>

                        <Box>
                            <FormTitle
                                placeholder="Enter your password"
                                register={register("password")}
                                error={errors.password}
                                type="password"
                            />
                        </Box>

                        <Box>
                            <Flex gap="2" style={{ width: '100%' }}>
                                <Button
                                    onMouseOver={() => setMouseOver(true)}
                                    onMouseOut={() => setMouseOver(false)}
                                    variant="surface"
                                    size="3"
                                    style={{ flex: 1 }}
                                    type="button"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        await AuthService.signInWithGoogle();
                                    }}
                                >
                                    <Flex align="center" gap="2">
                                        {mouseOver ? <FcGoogle size={18} /> : <FaGoogle size={16} />}
                                        <Text size="2">Google</Text>
                                    </Flex>
                                </Button>

                                <Button
                                    type="submit"
                                    size="3"
                                    style={{ flex: 1 }}
                                    disabled={isSubmitting}
                                >
                                    <Flex align="center" gap="2">
                                        {isSubmitting && <Spinner size="2" />}
                                        <Text size="2">{label}</Text>
                                    </Flex>
                                </Button>
                            </Flex>
                        </Box>

                        {error && <ErrorCallOut error={error} />}
                    </Flex>
                </form>

                <ConfirmCallOut sucsses={isOk} />

                <Box pt="4">
                    <Flex gap="1" justify="center">
                        <Text color="gray">
                            {type === "register" ? "Already registered? " : "Don't have an account?"}
                        </Text>
                        <Link href={type === "register" ? "/auth/signin" : "/auth/signup"}>
                            <Text color="blue" weight="medium">
                                {type === "register" ? "Sign in" : "Sign up"}
                            </Text>
                        </Link>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default AuthForm;
