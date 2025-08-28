"use client"
import { Flex } from "@radix-ui/themes";
import AuthForm from "../AuthenticationForm";
import Image from "next/image";
import ImageForm from "@/public/background.jpg"; 
import { Heading, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Signin = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 dark:from-blue-900 dark:via-indigo-800 dark:to-purple-900">
      <div className="absolute top-6 left-6 z-10 animate-fade-in-left">
        <Link href="/">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover-scale">
            <ArrowLeftIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Back to Home</span>
          </div>
        </Link>
      </div>

      <Flex className="min-h-screen w-full flex-col items-center justify-center lg:flex-row lg:justify-center p-4 lg:p-8" style={{ gap: '50px' }}>
        <div className="flex justify-center items-center w-full lg:w-6/12 mb-8 lg:mb-0 lg:pl-[18px]">
          <div className="relative w-full max-w-xl mx-auto">
            <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl"></div>
            <div className="relative p-8 lg:p-12">
              <div className="text-center mb-8 animate-fade-in-up">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <Heading size="6" className="text-slate-800 dark:text-slate-200 mb-2">
                  Welcome Back
                </Heading>
                <Text className="text-slate-600 dark:text-slate-400">
                  Sign in to your account to continue
                </Text>
              </div>
              
              <AuthForm type="signin" />
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex w-6/12 justify-center items-center animate-fade-in-right">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative">
              <Image 
                src={ImageForm} 
                alt="Issue Tracker" 
                className="rounded-3xl shadow-2xl w-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </div>
            
            <div className="absolute -top-6 -left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <Text className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Track Issues</Text>
                  <Text className="text-slate-600 dark:text-slate-400 text-xs">Manage your projects</Text>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <Text className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Fast & Secure</Text>
                  <Text className="text-slate-600 dark:text-slate-400 text-xs">Real-time updates</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Flex>
    </div>
  )
}

export default Signin
