"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorHandling } from "@/helpers/errorHandling";

export default function Article() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      ErrorHandling(res)

      const data = await res.json();
      // localStorage.setItem("auth", data.token);
      // router.push("/admin/dashboard/article");
    } catch (err) {
      console.error("Ini error: ",err);
    }
  };

  return (
    <>
      <div className="flex justify-center h-screen items-center">
        <div className="border p-5 rounded-2xl border-slate-400">
          <div className="font-bold text-xl">Login</div>
          <p className="mt-4">Username:</p>
          <input
            className="border rounded-xl border-slate-400  px-2"
            value={email}
            type="text"
            size={30}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password:</p>
          <input
            className="border rounded-xl border-slate-400 px-2"
            value={password}
            type="text"
            size={30}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="justify-around mt-5">
            <div className="flex justify-center mt-2">
              <div
                className="bg-white px-8 text-black py-1 rounded-full border cursor-pointer hover:bg-slate-200"
                onClick={() => handleLogin()}
              >
                <span>Login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
