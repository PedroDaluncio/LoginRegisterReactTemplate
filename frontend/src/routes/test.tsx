"use client"

import { useState } from "react"
import { Input } from "../components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from "../schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Test() {
  const [activeBtn, setActiveBtn] = useState("Fazer Login")
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
    <main className="flex flex-col items-end justify-center h-full w-full bg-white">
      <div className="flex flex-col items-center h-[90%] w-[40%] bg-[#f5f5f5] rounded-[7px] mr-[20px] py-5 gap-5 ">
        <h1 className="font-bold text-4xl">{activeBtn === "Fazer Login" ? "Fazer Login" : "Criar Conta"}</h1>
        <div className="flex gap-1 justify-center rounded-[7px] items-center w-[41%] bg-[#eaeaea] h-[8%]">
          <button
            className={`rounded-[7px] w-30 h-10 px-4 cursor-pointer ${activeBtn === "Fazer Login" ? "bg-white" : "bg-none"} transition duration-500 ease-initial text-black`}
            onClick={() => setActiveBtn("Fazer Login")}
          >Fazer Login</button>
          <button
            className={`rounded-[7px] w-30 h-10 px-4 cursor-pointer ${activeBtn === "Criar Conta" ? "bg-white" : "bg-none"} transition duration-500 ease-initial text-black`}
            onClick={() => setActiveBtn("Criar Conta")}
          >Criar Conta</button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[80%]">
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
                      placeholder="@Suasenha1234"
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
                </FormItem >
              )}
            >
            </FormField>
          </form>
        </Form>
      </div>
    </main>
  )
}