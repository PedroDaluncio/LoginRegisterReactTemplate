import { useState } from "react"

export default function App() {
  const [activeBtn, setActiveBtn] = useState("btn1")

  return (
    <div className="flex gap-1 justify-center rounded-[7px] items-center w-[16.3%] bg-[#eaeaea] h-[6.3%]">
      <button
        className={`rounded-[7px] w-30 h-10 p-4 cursor-pointer ${activeBtn === "btn1" ? "bg-white" : "bg-none"} transition duration-500 ease-initial text-black`}
        onClick={() => setActiveBtn("btn1")}
      >bt1</button>
      <button
        className={`rounded-[7px] w-30 h-10 p-4 cursor-pointer ${activeBtn === "btn2" ? "bg-white" : "bg-none"} transition duration-500 ease-initial text-black`}
        onClick={() => setActiveBtn("btn2")}
      >bt2</button>
    </div>
  )
}
