"use client"

import { useState } from "react"
import { Input } from "../../components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from "../../schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router"

export default function LoginForm() {
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
    <>
    <button className="gsi-material-button">
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: "block"}}>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        <span className="gsi-material-button-contents">Sign in with Google</span>
        <span style={{display: "none"}}>Sign in with Google</span>
      </div>
    </button>
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
                    className={`bg-white pr-10 ${fieldState.error ? 'border-red-500 focus:border-red-500' : ''}`}
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
            Entrar
          </button>
        </form>
      </Form>
    </>
  )
}