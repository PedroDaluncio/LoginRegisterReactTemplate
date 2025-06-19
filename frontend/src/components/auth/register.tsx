"use client"

import { useState } from "react"
import { Input } from "../../components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerSchema } from "../../schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-[80%] mb-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Nome completo:</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" className="bg-white" {...field}/>
                </FormControl>
                { fieldState.error && (
                  <FormMessage className="mt-0 mb-0 pt-0 pb-0 "> {fieldState.error.message} </FormMessage>
                )}
              </FormItem >
            )}
          >
          </FormField>
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
              </FormItem >
            )}
            >
            </FormField>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem className="mb-4">
                <FormLabel>Confirme sua senha:</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    className={`bg-white pr-10 ${fieldState.error ? 'border-red-500 focus:border-red-500' : ''}`}
                    {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      { showConfirmPassword ? <IoEye /> : <IoEyeOff /> }
                    </button>
                  </div>
                </FormControl>
                { fieldState.error && (
                  <FormMessage> {fieldState.error.message} </FormMessage>
                )}
              </FormItem >
            )}
          >
          </FormField>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full hover:cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
      </Form>
    </>
  )
}