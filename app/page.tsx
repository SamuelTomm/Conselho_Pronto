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

    // Simulação de login com diferentes tipos de usuário
    setTimeout(() => {
      if (email === "admin@ivoti.edu.br" && password === "123456") {
        // Administrador - vai para dashboard principal
        localStorage.setItem("userType", "admin")
        localStorage.setItem("userName", "Administrador")
        window.location.href = "/dashboard"
      } else if (email === "professor@ivoti.edu.br" && password === "123456") {
        // Professor - vai para página de turmas
        localStorage.setItem("userType", "professor")
        localStorage.setItem("userName", "Prof. Maria Silva")
        window.location.href = "/dashboard/professor-turmas"
      } else if (email === "coordenador@ivoti.edu.br" && password === "123456") {
        // Coordenador - vai para conselho de classe
        localStorage.setItem("userType", "coordenador")
        localStorage.setItem("userName", "Coordenador")
        window.location.href = "/dashboard/conselho-classe"
      } else {
        setError("Usuário ou senha incorretos. Verifique suas credenciais.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex font-sans overflow-hidden">
      {/* Left Section - Instituto Ivoti Branding */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-600 to-slate-600 relative overflow-hidden h-screen">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 text-center text-white px-8 max-w-md">
          <div className="mb-6">
            <div className="mb-6">
              <img
                src="/Logo_IEI.jpg"
                alt="Logo IEI"
                className="mx-auto mb-4 max-w-48 w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <h1 className="text-3xl font-bold mb-3 font-[family-name:var(--font-space-grotesk)]">Conselho Pronto</h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Sistema completo de gestão educacional para acompanhamento acadêmico e conselhos de classe.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
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
      <div className="flex-1 flex items-start justify-center pt-16 p-8 bg-white h-screen">
        <div className="w-full max-w-md">
          <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="text-center pb-4 pt-6 bg-gradient-to-b from-blue-50 to-white">
                          <CardTitle className="text-2xl font-bold text-blue-700 mb-2 font-[family-name:var(--font-space-grotesk)]">
              Acesse sua Conta
            </CardTitle>
              <p className="text-blue-600 text-sm">Entre com suas credenciais para continuar</p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 font-medium mb-2">Credenciais de Teste:</p>
                <div className="text-xs text-blue-600 space-y-1">
                  <div><strong>Admin:</strong> admin@ivoti.edu.br / 123456</div>
                  <div><strong>Professor:</strong> professor@ivoti.edu.br / 123456</div>
                  <div><strong>Coordenador:</strong> coordenador@ivoti.edu.br / 123456</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-4">
                              <form onSubmit={handleLogin} className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    placeholder="seu.email@ivoti.edu.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
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
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
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
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-semibold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
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

              <Link href="/criar-conta">
                <Button
                  variant="outline"
                  className="w-full h-14 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 bg-white font-semibold text-base rounded-xl transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                >
                  Criar Nova Conta
                </Button>
              </Link>

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
