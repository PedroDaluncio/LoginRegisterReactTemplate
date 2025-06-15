"use client"

import { useState } from "react"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Senha deve conter pelo menos um caractere especial"),
})

export default function App() {
  const [activeBtn, setActiveBtn] = useState("Fazer Login")
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
        <div className="flex flex-col gap-1 w-[80%]">
          <Label htmlFor="email" className="text-3x1">Email:</Label>
          <Input type="email" id="email" placeholder="seu@email.com" className="bg-white"/>
        </div>
      </div>
    </main>
  )
}
