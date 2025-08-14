"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, School, BookOpen, Users, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulação de envio de email
    setTimeout(() => {
      if (email.includes("@ivoti.edu.br")) {
        setSuccess(true)
      } else {
        setError("E-mail não encontrado no sistema. Verifique se você está usando o e-mail institucional.")
      }
      setIsLoading(false)
    }, 2000)
  }

  if (success) {
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

        {/* Right Section - Success Message */}
        <div className="flex-1 flex items-start justify-center pt-16 p-8 bg-white h-screen">
          <div className="w-full max-w-md">
            <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="text-center pb-4 pt-6 bg-gradient-to-b from-green-50 to-white">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-600 p-3 rounded-full">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-green-700 mb-2 font-[family-name:var(--font-space-grotesk)]">
                  E-mail Enviado!
                </CardTitle>
                <p className="text-green-600 text-sm">Verifique sua caixa de entrada</p>
              </CardHeader>
              <CardContent className="px-6 pb-4 text-center space-y-4">
                <p className="text-gray-600">Enviamos as instruções para recuperação de senha para:</p>
                <p className="font-medium text-gray-900">{email}</p>
                <p className="text-sm text-gray-500">
                  Se não receber o e-mail em alguns minutos, verifique sua pasta de spam.
                </p>
                <Link href="/">
                  <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-semibold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
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

      {/* Right Section - Recovery Form */}
      <div className="flex-1 flex items-start justify-center pt-16 p-8 bg-white h-screen">
        <div className="w-full max-w-md">
          <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="text-center pb-4 pt-6 bg-gradient-to-b from-blue-50 to-white">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <School className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-blue-700 mb-2 font-[family-name:var(--font-space-grotesk)]">
                Recuperar Senha
              </CardTitle>
              <p className="text-blue-600 text-sm">Digite seu e-mail institucional para receber as instruções</p>
            </CardHeader>
            <CardContent className="px-6 pb-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail Institucional</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@ivoti.edu.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
                    required
                  />
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
                  {isLoading ? "Enviando..." : "Enviar Instruções"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline flex items-center justify-center">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Voltar ao Login
                </Link>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800 font-medium">Importante:</p>
                <p className="text-xs text-blue-700">
                  Apenas e-mails institucionais (@ivoti.edu.br) são aceitos no sistema.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
