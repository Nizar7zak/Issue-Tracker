"use client"
import { Flex } from "@radix-ui/themes";
import AuthForm from "../AuthenticationForm";
import Image from "next/image";
import ImageForm from "@/public/background.jpg"; 

const Signin = () => {
  return (
    <Flex
      className="flex-col items-center justify-center lg:flex-row lg:justify-between mt-[15vh] lg:mt-[20vh] xl:space-x-14"
    >
      <div className="flex justify-center items-center w-full md:w-4/5 lg:w-1/2">
        <AuthForm type="signin" />
      </div>
     
      <div className="hidden lg:block w-1/2">
        <Image src={ ImageForm } alt={ 'issuetracker' } /> 
      </div>
    </Flex>
  )
}
export default Signin