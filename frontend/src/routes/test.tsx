"use client"

import { useState } from "react"
import { Input } from "../components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from "../schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router"

export default function AuthPage() {
  const [activeBtn, setActiveBtn] = useState("Login")
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <main className="flex flex-col items-center justify-center h-full w-full bg-[#f5f5f5]">
      <div className="flex flex-col items-center h-[90%] w-[35%] bg-white rounded-[15px] mr-[20px] py-10 gap-5 shadow-lg">
        <h1 className="font-bold text-4xl">{activeBtn === "Login" ? "Login" : "CreateAccount"}</h1>
        <div className="flex gap-1 justify-center rounded-[7px] items-center w-[46%] bg-[#eaeaea] h-[7.5%]">
          <button
            className={`rounded-[7px] w-30 h-10 px-4 cursor-pointer ${activeBtn === "Login" ? "bg-white" : "bg-none"} transition duration-500 ease-initial text-black`}
            onClick={() => setActiveBtn("Login")}
          >Entrar</button>
          <button
            className={`rounded-[7px] w-30 h-10 px-4 cursor-pointer ${activeBtn === "CreateAccount" ? "bg-white" : "bg-none"} transition duration-500 ease-initial text-black`}
            onClick={() => setActiveBtn("CreateAccount")}
          >Criar Conta</button>
        </div>
        <div className="text-gray-500 font-normal text-xs w-[80%] text-center relative flex items-center justify-center">
          <hr className="flex-1 border-gray-300"/>
          <span className="px-2 text-sm ">ou entre com a sua conta</span>
          <hr className="flex-1 border-gray-300"/>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[80%] mb-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" className="bg-white" {...field}/>
                  </FormControl>
                  { fieldState.error && (
                    <FormMessage> {fieldState.error.message} </FormMessage>
                  )}
                </FormItem >
              )}
            >
            </FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Senha:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="bg-white pr-10"
                      {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        { showPassword ? <IoEye /> : <IoEyeOff /> }
                      </button>
                    </div>
                  </FormControl>
                  { fieldState.error && (
                    <FormMessage> {fieldState.error.message} </FormMessage>
                  )}
                  <div className="flex flex-col items-end">
                    <Link to="/" className="text-sm text-gray-500 mt-1 hover:text-purple-500">Esqueceu sua senha?</Link>
                  </div>
                </FormItem >
              )}
            >
            </FormField>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full hover:cursor-pointer"
            >
              {activeBtn === "Login" ? "Entrar" : "createAccount"}
            </button>
          </form>
        </Form>
      </div>
    </main>
  )
}