"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, UserPlus, School, BookOpen, Users, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function CriarContaPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipoUsuario: "",
    telefone: "",
    matricula: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [aceiteTermos, setAceiteTermos] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validações
    if (!aceiteTermos) {
      setError("Você deve aceitar os termos de uso para continuar.")
      setIsLoading(false)
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem.")
      setIsLoading(false)
      return
    }

    if (!formData.email.includes("@ivoti.edu.br")) {
      setError("Apenas e-mails institucionais (@ivoti.edu.br) são aceitos.")
      setIsLoading(false)
      return
    }

    // Simulação de criação de conta
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
    }, 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex flex-col lg:flex-row font-sans overflow-hidden">
        {/* Left Section - Instituto Ivoti Branding */}
        <div className="lg:flex-1 flex items-center justify-center bg-gradient-to-br from-blue-600 to-slate-600 relative overflow-hidden min-h-screen lg:h-screen">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10 text-center text-white px-4 lg:px-8 max-w-md">
            <div className="mb-6">
              <div className="mb-6">
                <img
                  src="/Logo_IEI.jpg"
                  alt="Logo IEI"
                  className="mx-auto mb-4 max-w-32 lg:max-w-48 w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-3 font-[family-name:var(--font-space-grotesk)]">Conselho Pronto</h1>
              <p className="text-base lg:text-lg text-blue-100 leading-relaxed">
                Sistema completo de gestão educacional para acompanhamento acadêmico e conselhos de classe.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-6 lg:mt-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg mb-2 lg:mb-3 backdrop-blur-sm">
                  <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <p className="text-xs lg:text-sm text-blue-100">Gestão de Disciplinas</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg mb-2 lg:mb-3 backdrop-blur-sm">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <p className="text-xs lg:text-sm text-blue-100">Controle de Turmas</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg mb-2 lg:mb-3 backdrop-blur-sm">
                  <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <p className="text-xs lg:text-sm text-blue-100">Acompanhamento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Success Message */}
        <div className="lg:flex-1 flex items-start justify-center pt-8 lg:pt-16 p-4 bg-white min-h-screen lg:h-screen">
          <div className="w-full max-w-md">
            <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="text-center pb-4 pt-6 bg-gradient-to-b from-green-50 to-white">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-600 p-3 rounded-full">
                    <UserPlus className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-green-700 mb-2 font-[family-name:var(--font-space-grotesk)]">
                  Conta Criada!
                </CardTitle>
                <p className="text-green-600 text-sm">Sua conta foi criada com sucesso</p>
              </CardHeader>
              <CardContent className="px-4 lg:px-6 pb-4 text-center space-y-4">
                <p className="text-gray-600">Bem-vindo ao Conselho Pronto!</p>
                <p className="text-sm text-gray-500">
                  Sua conta foi criada e está aguardando aprovação da administração.
                </p>
                <p className="text-sm text-gray-500">
                  Você receberá um e-mail quando sua conta for aprovada.
                </p>
                <Link href="/">
                  <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-semibold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Ir para o Login
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 flex flex-col lg:flex-row font-sans overflow-hidden">
      {/* Left Section - Instituto Ivoti Branding */}
      <div className="lg:flex-1 flex items-center justify-center bg-gradient-to-br from-blue-600 to-slate-600 relative overflow-hidden min-h-screen lg:h-screen">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 lg:px-8 max-w-md">
          <div className="mb-6">
            <div className="mb-6">
              <img
                src="/Logo_IEI.jpg"
                alt="Logo IEI"
                className="mx-auto mb-4 max-w-32 lg:max-w-48 w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-3 font-[family-name:var(--font-space-grotesk)]">Conselho Pronto</h1>
            <p className="text-base lg:text-lg text-blue-100 leading-relaxed">
              Sistema completo de gestão educacional para acompanhamento acadêmico e conselhos de classe.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-6 lg:mt-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg mb-2 lg:mb-3 backdrop-blur-sm">
                <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <p className="text-xs lg:text-sm text-blue-100">Gestão de Disciplinas</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg mb-2 lg:mb-3 backdrop-blur-sm">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <p className="text-xs lg:text-sm text-blue-100">Controle de Turmas</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg mb-2 lg:mb-3 backdrop-blur-sm">
                <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <p className="text-xs lg:text-sm text-blue-100">Acompanhamento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="lg:flex-1 flex items-start justify-center pt-8 lg:pt-16 p-4 bg-white min-h-screen lg:h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="text-center pb-4 pt-6 bg-gradient-to-b from-blue-50 to-white">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl lg:text-2xl font-bold text-blue-700 mb-2 font-[family-name:var(--font-space-grotesk)]">
                Criar Nova Conta
              </CardTitle>
              <p className="text-blue-600 text-sm">Preencha os dados para criar sua conta</p>
            </CardHeader>
            <CardContent className="px-4 lg:px-6 pb-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome Completo</Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail Institucional</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@ivoti.edu.br"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoUsuario" className="text-sm font-medium text-gray-700">Tipo de Usuário</Label>
                  <Select value={formData.tipoUsuario} onValueChange={(value) => handleInputChange("tipoUsuario", value)}>
                    <SelectTrigger className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300">
                      <SelectValue placeholder="Selecione o tipo de usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professor">Professor</SelectItem>
                      <SelectItem value="coordenador">Coordenador</SelectItem>
                      <SelectItem value="diretor">Diretor</SelectItem>
                      <SelectItem value="secretario">Secretário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="matricula" className="text-sm font-medium text-gray-700">Matrícula/Registro</Label>
                  <Input
                    id="matricula"
                    type="text"
                    placeholder="Digite sua matrícula ou registro"
                    value={formData.matricula}
                    onChange={(e) => handleInputChange("matricula", e.target.value)}
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">Telefone</Label>
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(51) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha" className="text-sm font-medium text-gray-700">Senha</Label>
                  <Input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha" className="text-sm font-medium text-gray-700">Confirmar Senha</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={formData.confirmarSenha}
                    onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="termos"
                    checked={aceiteTermos}
                    onCheckedChange={(checked) => setAceiteTermos(checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="termos" className="text-xs text-gray-700 leading-relaxed">
                    Aceito os{" "}
                    <Link href="/termos" className="text-blue-600 hover:underline">
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacidade" className="text-blue-600 hover:underline">
                      Política de Privacidade
                    </Link>
                  </Label>
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
                  {isLoading ? "Criando Conta..." : "Criar Conta"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline flex items-center justify-center">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Já tenho uma conta
                </Link>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800 font-medium">Importante:</p>
                <p className="text-xs text-blue-700">
                  Apenas e-mails institucionais (@ivoti.edu.br) são aceitos no sistema.
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Sua conta será revisada pela administração antes da aprovação.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
