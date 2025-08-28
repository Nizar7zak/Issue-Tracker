"use client"
import { Flex } from "@radix-ui/themes";
import AuthForm from "../AuthenticationForm";
import Image from "next/image";
import ImageForm from "@/public/background.jpg"; 
import { Heading, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-purple-100 via-pink-200 to-indigo-200 dark:from-purple-900 dark:via-pink-800 dark:to-indigo-900">
      <div className="absolute top-6 left-6 z-10 animate-fade-in-left">
        <Link href="/">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover-scale">
            <ArrowLeftIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Back to Home</span>
          </div>
        </Link>
      </div>

      <Flex className="min-h-screen w-full flex-col items-center justify-center lg:flex-row lg:justify-center p-4 lg:p-8" style={{ gap: '50px' }}>
        <div className="flex justify-center items-center w-full lg:w-6/12 mb-8 lg:mb-0 lg:pl-[18px]">
          <div className="relative w-full max-w-xl mx-auto">
            <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl"></div>
            <div className="relative p-8 lg:p-12">
              <div className="text-center mb-8 animate-fade-in-up">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <Heading size="6" className="text-slate-800 dark:text-slate-200 mb-2">
                  Join Our Community
                </Heading>
                <Text className="text-slate-600 dark:text-slate-400">
                  Create your account to get started
                </Text>
              </div>
              
              <AuthForm type="register" />
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex w-6/12 justify-center items-center animate-fade-in-right">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
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
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <Text className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Team Collaboration</Text>
                  <Text className="text-slate-600 dark:text-slate-400 text-xs">Work together seamlessly</Text>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <Text className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Analytics & Insights</Text>
                  <Text className="text-slate-600 dark:text-slate-400 text-xs">Track your progress</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Flex>
    </div>
  )
}

export default Signup
