"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { BookOpen, Users, GraduationCap } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulação de login
    setTimeout(() => {
      if (email === "professor@ivoti.edu.br" && password === "123456") {
        window.location.href = "/dashboard"
      } else {
        setError("Usuário ou senha incorretos. Verifique suas credenciais.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex font-sans overflow-hidden">
      {/* Left Section - Instituto Ivoti Branding */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-600 to-slate-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 text-center text-white px-12 max-w-lg">
          <div className="mb-8">
            <div className="mb-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DAI3IzdMKhXB51NiCG5uhJDSxiOu5N.png"
                alt="Conselho Pronto"
                className="mx-auto mb-6 max-w-xs w-full h-auto filter brightness-0 invert"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">Conselho Pronto</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Sistema completo de gestão educacional para acompanhamento acadêmico e conselhos de classe.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3 backdrop-blur-sm">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-blue-100">Gestão de Disciplinas</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3 backdrop-blur-sm">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-blue-100">Controle de Turmas</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3 backdrop-blur-sm">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-blue-100">Acompanhamento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="text-center pb-8 pt-12 bg-gradient-to-b from-blue-50 to-white">
              <CardTitle className="text-3xl font-bold text-blue-700 mb-2 font-[family-name:var(--font-space-grotesk)]">
                Acesse sua Conta
              </CardTitle>
              <p className="text-blue-600 text-sm">Entre com suas credenciais para continuar</p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    placeholder="seu.email@ivoti.edu.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Senha</label>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>

                <div className="text-right">
                  <Link
                    href="/esqueci-senha"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>

                {error && (
                  <Alert variant="destructive" className="rounded-xl border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-semibold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    "Entrar no Sistema"
                  )}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">ou</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-14 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 bg-white font-semibold text-base rounded-xl transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
              >
                Criar Nova Conta
              </Button>

              <p className="text-center text-xs text-gray-500 mt-6">
                Ao entrar, você concorda com nossos{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
