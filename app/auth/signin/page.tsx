"use client"
import FormBackground from "@/app/components/Form/FormBackground";
import { Flex } from "@radix-ui/themes";
import AuthForm from "../AuthenticationForm";

const Signin = () => {
  return (
    <Flex justify={"between"} mt="55px" gap={"9"}  >
      <div className="flex justify-center sm:w-full md:w-4/5 lg:w-1/2 xl:h-4/6 mt-20">
        <AuthForm type="signin" />
      </div>
      <FormBackground />
    </Flex>

  )
}
export default Signin