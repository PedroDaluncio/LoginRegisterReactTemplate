import { useState } from "react"
import LoginForm from "@/components/auth/login"
import RegisterForm from "@/components/auth/register"

export default function AuthPage() {
  const [activeBtn, setActiveBtn] = useState("Login")

  return (
    <main className="flex flex-col items-center justify-center h-full w-full bg-[#f5f5f5]">
      <div className="flex flex-col items-center h-[90%] w-[35%] bg-white rounded-[15px] mr-[20px] py-10 gap-5 shadow-lg">
        <h1 className="font-bold text-4xl">{activeBtn === "Login" ? "Fazer Login" : "Crie sua conta"}</h1>
        <div className="flex gap-1 justify-center rounded-[7px] items-center w-[46%] bg-[#eaeaea] h-[7.5%]">
          <button
            className={`rounded-[7px] w-30 h-10 px-4 cursor-pointer ${activeBtn === "Login" ? "bg-white" : "bg-none"} transition duration-500 ease-initial text-black`}
            onClick={() => setActiveBtn("Login")}
          >Entrar</button>
          <button
            className={`rounded-[7px] w-30 h-10 px-4 cursor-pointer ${activeBtn === "CreateAccount" ? "bg-white" : "bg-none"} transition duration-500 ease-initial text-black`}
            onClick={() => setActiveBtn("CreateAccount")}
          >Cadastrar</button>
        </div>
        {activeBtn && activeBtn === "Login"
          ? <LoginForm />
          : <RegisterForm />
        }
      </div>
    </main>
  )
}