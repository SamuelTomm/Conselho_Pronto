"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  LogOut,
  Settings,
  School,
  Users,
  BookOpen,
  Home,
  Circle,
  FileText,
  Send,
  Camera,
  Save,
  Bell,
  Shield,
  Palette,
  X,
  Plus,
  UserCheck,
  MoreHorizontal,
  Edit,
  EyeOff,
  Eye,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { id: "inicio", label: "Início", icon: Home, active: false },
  { id: "ciclos", label: "Anos Letivos", icon: Circle, active: false },
  { id: "cursos", label: "Cursos", icon: FileText, active: false },
  { id: "alunos", label: "Alunos", icon: Users, active: false },
  { id: "disciplinas", label: "Disciplinas", icon: BookOpen, active: false },
  { id: "turmas", label: "Turmas", icon: Send, active: false },
  { id: "configuracoes", label: "Configurações", icon: Settings, active: true },
]

const mockProfessores = [
  {
    id: 1,
    nome: "Prof. João Santos",
    email: "joao.santos@escola.com",
    telefone: "(51) 99888-7777",
    disciplinas: ["Matemática", "Física"],
    turmas: ["9º A", "1º B", "2º A"],
    permissoes: {
      verAlunos: true,
      verNotas: true,
      verFaltas: true,
      editarNotas: true,
      editarFaltas: false,
      verRelatorios: true,
    },
    status: "ativo",
    dataContratacao: "2020-02-15",
  },
  {
    id: 2,
    nome: "Prof. Ana Costa",
    email: "ana.costa@escola.com",
    telefone: "(51) 99777-6666",
    disciplinas: ["Português", "Literatura"],
    turmas: ["8º A", "9º B"],
    permissoes: {
      verAlunos: true,
      verNotas: true,
      verFaltas: true,
      editarNotas: true,
      editarFaltas: true,
      verRelatorios: false,
    },
    status: "ativo",
    dataContratacao: "2019-03-10",
  },
  {
    id: 3,
    nome: "Prof. Carlos Silva",
    email: "carlos.silva@escola.com",
    telefone: "(51) 99666-5555",
    disciplinas: ["História", "Geografia"],
    turmas: ["7º A"],
    permissoes: {
      verAlunos: true,
      verNotas: false,
      verFaltas: true,
      editarNotas: false,
      editarFaltas: false,
      verRelatorios: false,
    },
    status: "inativo",
    dataContratacao: "2021-08-20",
  },
]

const mockTurmasDisponiveis = [
  "7º A",
  "7º B",
  "8º A",
  "8º B",
  "9º A",
  "9º B",
  "1º A",
  "1º B",
  "2º A",
  "2º B",
  "3º A",
  "3º B",
]
const mockDisciplinasDisponiveis = [
  "Matemática",
  "Português",
  "História",
  "Geografia",
  "Ciências",
  "Física",
  "Química",
  "Biologia",
  "Literatura",
  "Inglês",
  "Educação Física",
  "Artes",
]

export default function ConfiguracoesPage() {
  const [activeMenuItem, setActiveMenuItem] = useState("configuracoes")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("perfil")
  const [successMessage, setSuccessMessage] = useState("")

  const handleLogout = () => {
    // Limpar dados de sessão (se houver)
    localStorage.removeItem("user")
    sessionStorage.clear()
    
    // Redirecionar para a página de login
    window.location.href = "/"
  }

  const [professores, setProfessores] = useState(mockProfessores)
  const [isAddProfessorOpen, setIsAddProfessorOpen] = useState(false)
  const [isEditProfessorOpen, setIsEditProfessorOpen] = useState(false)
  const [selectedProfessor, setSelectedProfessor] = useState(null)
  const [searchProfessor, setSearchProfessor] = useState("")

  const [novoProfessor, setNovoProfessor] = useState({
    nome: "",
    email: "",
    telefone: "",
    disciplinas: [],
    turmas: [],
    permissoes: {
      verAlunos: true,
      verNotas: false,
      verFaltas: false,
      editarNotas: false,
      editarFaltas: false,
      verRelatorios: false,
    },
    status: "ativo",
  })

  // Estados do perfil
  const [perfilData, setPerfilData] = useState({
    nome: "Prof. Maria Silva",
    email: "maria.silva@ivoti.edu.br",
    telefone: "(51) 99999-9999",
    endereco: "Rua das Flores, 123 - Ivoti/RS",
    bio: "Professora de Matemática com 15 anos de experiência no ensino médio.",
    dataContratacao: "2010-03-15",
    registro: "MAT-2010-001",
  })

  // Estados das configurações
  const [configData, setConfigData] = useState({
    notificacoes: {
      email: true,
      push: false,
      relatorios: true,
      lembretes: true,
    },
    sistema: {
      temaEscuro: false,
      idioma: "pt-BR",
      fusoHorario: "America/Sao_Paulo",
    },
    privacidade: {
      perfilPublico: false,
      compartilharDados: false,
      historicoVisivel: true,
    },
  })

  // Efeito para detectar mouse na borda esquerda
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 20) {
        setSidebarOpen(true)
      } else if (e.clientX > 280 && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [sidebarOpen])

  const handlePerfilSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular salvamento
    setSuccessMessage("Perfil atualizado com sucesso!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular salvamento
    setSuccessMessage("Configurações salvas com sucesso!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleAddProfessor = (e: React.FormEvent) => {
    e.preventDefault()
    const novoId = Math.max(...professores.map((p) => p.id)) + 1
    const professorCompleto = {
      ...novoProfessor,
      id: novoId,
      dataContratacao: new Date().toISOString().split("T")[0],
    }
    setProfessores([...professores, professorCompleto])
    setNovoProfessor({
      nome: "",
      email: "",
      telefone: "",
      disciplinas: [],
      turmas: [],
      permissoes: {
        verAlunos: true,
        verNotas: false,
        verFaltas: false,
        editarNotas: false,
        editarFaltas: false,
        verRelatorios: false,
      },
      status: "ativo",
    })
    setIsAddProfessorOpen(false)
    setSuccessMessage("Professor cadastrado com sucesso!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleEditProfessor = (professor) => {
    setSelectedProfessor(professor)
    setIsEditProfessorOpen(true)
  }

  const handleUpdateProfessor = (e: React.FormEvent) => {
    e.preventDefault()
    setProfessores(professores.map((p) => (p.id === selectedProfessor.id ? selectedProfessor : p)))
    setIsEditProfessorOpen(false)
    setSelectedProfessor(null)
    setSuccessMessage("Professor atualizado com sucesso!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleDeleteProfessor = (id) => {
    setProfessores(professores.filter((p) => p.id !== id))
    setSuccessMessage("Professor removido com sucesso!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const toggleProfessorStatus = (id) => {
    setProfessores(
      professores.map((p) => (p.id === id ? { ...p, status: p.status === "ativo" ? "inativo" : "ativo" } : p)),
    )
  }

  const filteredProfessores = professores.filter(
    (professor) =>
      professor.nome.toLowerCase().includes(searchProfessor.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchProfessor.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <School className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-semibold text-sm">Conselho Pronto</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-slate-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeMenuItem === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveMenuItem(item.id)
                      setSidebarOpen(false)
                      if (item.id === "inicio") {
                        window.location.href = "/dashboard"
                      } else if (item.id === "ciclos") {
                        window.location.href = "/dashboard/ciclos"
                      } else if (item.id === "cursos") {
                        window.location.href = "/dashboard/cursos"
                      } else if (item.id === "alunos") {
                        window.location.href = "/dashboard/alunos"
                      } else if (item.id === "disciplinas") {
                        window.location.href = "/dashboard/disciplinas"
                      } else if (item.id === "turmas") {
                        window.location.href = "/dashboard/turmas"
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive ? "bg-slate-700 text-teal-400" : "text-gray-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Área invisível para trigger da sidebar */}
      <div className="fixed left-0 top-0 w-5 h-full z-40 bg-transparent" onMouseEnter={() => setSidebarOpen(true)} />

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Configurações</h1>
                <p className="text-sm text-gray-500">Gerencie seu perfil e configurações do sistema</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Prof. Maria Silva</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {successMessage && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="perfil" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="professores" className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4" />
                <span>Professores</span>
              </TabsTrigger>
              <TabsTrigger value="notificacoes" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notificações</span>
              </TabsTrigger>
              <TabsTrigger value="sistema" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Sistema</span>
              </TabsTrigger>
              <TabsTrigger value="privacidade" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Privacidade</span>
              </TabsTrigger>
            </TabsList>

            {/* Aba Perfil */}
            <TabsContent value="perfil">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Perfil</CardTitle>
                  <CardDescription>Atualize suas informações pessoais e profissionais</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePerfilSubmit} className="space-y-6">
                    {/* Foto do Perfil */}
                    <div className="flex items-center space-x-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" />
                        <AvatarFallback className="text-lg">MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button type="button" variant="outline" className="flex items-center space-x-2 bg-transparent">
                          <Camera className="h-4 w-4" />
                          <span>Alterar Foto</span>
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">JPG, PNG ou GIF. Máximo 2MB.</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Informações Pessoais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input
                          id="nome"
                          value={perfilData.nome}
                          onChange={(e) => setPerfilData({ ...perfilData, nome: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={perfilData.email}
                          onChange={(e) => setPerfilData({ ...perfilData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={perfilData.telefone}
                          onChange={(e) => setPerfilData({ ...perfilData, telefone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="registro">Registro Profissional</Label>
                        <Input
                          id="registro"
                          value={perfilData.registro}
                          onChange={(e) => setPerfilData({ ...perfilData, registro: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={perfilData.endereco}
                        onChange={(e) => setPerfilData({ ...perfilData, endereco: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea
                        id="bio"
                        value={perfilData.bio}
                        onChange={(e) => setPerfilData({ ...perfilData, bio: e.target.value })}
                        rows={4}
                        placeholder="Conte um pouco sobre sua experiência profissional..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataContratacao">Data de Contratação</Label>
                      <Input
                        id="dataContratacao"
                        type="date"
                        value={perfilData.dataContratacao}
                        onChange={(e) => setPerfilData({ ...perfilData, dataContratacao: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Salvar Alterações</span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Notificações */}
            <TabsContent value="notificacoes">
              <Card>
                <CardHeader>
                  <CardTitle>Preferências de Notificação</CardTitle>
                  <CardDescription>Configure como você deseja receber notificações</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleConfigSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações por E-mail</Label>
                          <p className="text-sm text-gray-500">Receba atualizações importantes por e-mail</p>
                        </div>
                        <Switch
                          checked={configData.notificacoes.email}
                          onCheckedChange={(checked) =>
                            setConfigData({
                              ...configData,
                              notificacoes: { ...configData.notificacoes, email: checked },
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificações Push</Label>
                          <p className="text-sm text-gray-500">Receba notificações no navegador</p>
                        </div>
                        <Switch
                          checked={configData.notificacoes.push}
                          onCheckedChange={(checked) =>
                            setConfigData({
                              ...configData,
                              notificacoes: { ...configData.notificacoes, push: checked },
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Relatórios Semanais</Label>
                          <p className="text-sm text-gray-500">Receba resumos semanais de atividades</p>
                        </div>
                        <Switch
                          checked={configData.notificacoes.relatorios}
                          onCheckedChange={(checked) =>
                            setConfigData({
                              ...configData,
                              notificacoes: { ...configData.notificacoes, relatorios: checked },
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Lembretes de Tarefas</Label>
                          <p className="text-sm text-gray-500">Receba lembretes sobre prazos importantes</p>
                        </div>
                        <Switch
                          checked={configData.notificacoes.lembretes}
                          onCheckedChange={(checked) =>
                            setConfigData({
                              ...configData,
                              notificacoes: { ...configData.notificacoes, lembretes: checked },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Salvar Configurações</span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Sistema */}
            <TabsContent value="sistema">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Sistema</CardTitle>
                  <CardDescription>Personalize a aparência e comportamento do sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleConfigSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Tema Escuro</Label>
                          <p className="text-sm text-gray-500">Ativar modo escuro para reduzir o cansaço visual</p>
                        </div>
                        <Switch
                          checked={configData.sistema.temaEscuro}
                          onCheckedChange={(checked) =>
                            setConfigData({
                              ...configData,
                              sistema: { ...configData.sistema, temaEscuro: checked },
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="idioma">Idioma</Label>
                        <select
                          id="idioma"
                          value={configData.sistema.idioma}
                          onChange={(e) =>
                            setConfigData({
                              ...configData,
                              sistema: { ...configData.sistema, idioma: e.target.value },
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="pt-BR">Português (Brasil)</option>
                          <option value="en-US">English (US)</option>
                          <option value="es-ES">Español</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fusoHorario">Fuso Horário</Label>
                        <select
                          id="fusoHorario"
                          value={configData.sistema.fusoHorario}
                          onChange={(e) =>
                            setConfigData({
                              ...configData,
                              sistema: { ...configData.sistema, fusoHorario: e.target.value },
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                          <option value="America/New_York">New York (GMT-5)</option>
                          <option value="Europe/London">London (GMT+0)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Salvar Configurações</span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba Privacidade */}
            <TabsContent value="privacidade">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Privacidade</CardTitle>
                  <CardDescription>Controle como suas informações são compartilhadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleConfigSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Perfil Público</Label>
                          <p className="text-sm text-gray-500">Permitir que outros professores vejam seu perfil</p>
                        </div>
                        <Switch
                          checked={configData.privacidade.perfilPublico}
                          onCheckedChange={(checked) =>
                            setConfigData({
                              ...configData,
                              privacidade: { ...configData.privacidade, perfilPublico: checked },
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Compartilhar Dados Analíticos</Label>
                          <p className="text-sm text-gray-500">
                            Ajudar a melhorar o sistema compartilhando dados de uso
                          </p>
                        </div>
                        <Switch
                          checked={configData.privacidade.compartilharDados}
                          onCheckedChange={(checked) =>
                            setConfigData({
                              ...configData,
                              privacidade: { ...configData.privacidade, compartilharDados: checked },
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Histórico Visível</Label>
                          <p className="text-sm text-gray-500">Mostrar histórico de atividades para outros usuários</p>
                        </div>
                        <Switch
                          checked={configData.privacidade.historicoVisivel}
                          onCheckedChange={(checked) =>
                            setConfigData({
                              ...configData,
                              privacidade: { ...configData.privacidade, historicoVisivel: checked },
                            })
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Zona de Perigo</h3>
                      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                        <h4 className="font-medium text-red-800 mb-2">Excluir Conta</h4>
                        <p className="text-sm text-red-600 mb-4">
                          Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
                        </p>
                        <Button variant="destructive" size="sm">
                          Excluir Conta
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Salvar Configurações</span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professores">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gerenciamento de Professores</CardTitle>
                      <CardDescription>Cadastre professores e gerencie suas permissões e atribuições</CardDescription>
                    </div>
                    <Dialog open={isAddProfessorOpen} onOpenChange={setIsAddProfessorOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex items-center space-x-2">
                          <Plus className="h-4 w-4" />
                          <span>Novo Professor</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Cadastrar Novo Professor</DialogTitle>
                          <DialogDescription>
                            Preencha as informações do professor e defina suas permissões
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddProfessor} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nome">Nome Completo</Label>
                              <Input
                                id="nome"
                                value={novoProfessor.nome}
                                onChange={(e) => setNovoProfessor({ ...novoProfessor, nome: e.target.value })}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">E-mail</Label>
                              <Input
                                id="email"
                                type="email"
                                value={novoProfessor.email}
                                onChange={(e) => setNovoProfessor({ ...novoProfessor, email: e.target.value })}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="telefone">Telefone</Label>
                              <Input
                                id="telefone"
                                value={novoProfessor.telefone}
                                onChange={(e) => setNovoProfessor({ ...novoProfessor, telefone: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="status">Status</Label>
                              <select
                                id="status"
                                value={novoProfessor.status}
                                onChange={(e) => setNovoProfessor({ ...novoProfessor, status: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                              >
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                              </select>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Disciplinas</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {mockDisciplinasDisponiveis.map((disciplina) => (
                                <div key={disciplina} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`disciplina-${disciplina}`}
                                    checked={novoProfessor.disciplinas.includes(disciplina)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setNovoProfessor({
                                          ...novoProfessor,
                                          disciplinas: [...novoProfessor.disciplinas, disciplina],
                                        })
                                      } else {
                                        setNovoProfessor({
                                          ...novoProfessor,
                                          disciplinas: novoProfessor.disciplinas.filter((d) => d !== disciplina),
                                        })
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`disciplina-${disciplina}`} className="text-sm">
                                    {disciplina}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Turmas</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {mockTurmasDisponiveis.map((turma) => (
                                <div key={turma} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`turma-${turma}`}
                                    checked={novoProfessor.turmas.includes(turma)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setNovoProfessor({
                                          ...novoProfessor,
                                          turmas: [...novoProfessor.turmas, turma],
                                        })
                                      } else {
                                        setNovoProfessor({
                                          ...novoProfessor,
                                          turmas: novoProfessor.turmas.filter((t) => t !== turma),
                                        })
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`turma-${turma}`} className="text-sm">
                                    {turma}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Permissões</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label>Visualizar Alunos</Label>
                                  <p className="text-sm text-gray-500">Permitir visualizar informações dos alunos</p>
                                </div>
                                <Switch
                                  checked={novoProfessor.permissoes.verAlunos}
                                  onCheckedChange={(checked) =>
                                    setNovoProfessor({
                                      ...novoProfessor,
                                      permissoes: { ...novoProfessor.permissoes, verAlunos: checked },
                                    })
                                  }
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label>Visualizar Notas</Label>
                                  <p className="text-sm text-gray-500">Permitir visualizar notas dos alunos</p>
                                </div>
                                <Switch
                                  checked={novoProfessor.permissoes.verNotas}
                                  onCheckedChange={(checked) =>
                                    setNovoProfessor({
                                      ...novoProfessor,
                                      permissoes: { ...novoProfessor.permissoes, verNotas: checked },
                                    })
                                  }
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label>Editar Notas</Label>
                                  <p className="text-sm text-gray-500">Permitir editar e adicionar notas</p>
                                </div>
                                <Switch
                                  checked={novoProfessor.permissoes.editarNotas}
                                  onCheckedChange={(checked) =>
                                    setNovoProfessor({
                                      ...novoProfessor,
                                      permissoes: { ...novoProfessor.permissoes, editarNotas: checked },
                                    })
                                  }
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label>Visualizar Faltas</Label>
                                  <p className="text-sm text-gray-500">Permitir visualizar faltas dos alunos</p>
                                </div>
                                <Switch
                                  checked={novoProfessor.permissoes.verFaltas}
                                  onCheckedChange={(checked) =>
                                    setNovoProfessor({
                                      ...novoProfessor,
                                      permissoes: { ...novoProfessor.permissoes, verFaltas: checked },
                                    })
                                  }
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label>Editar Faltas</Label>
                                  <p className="text-sm text-gray-500">Permitir editar e registrar faltas</p>
                                </div>
                                <Switch
                                  checked={novoProfessor.permissoes.editarFaltas}
                                  onCheckedChange={(checked) =>
                                    setNovoProfessor({
                                      ...novoProfessor,
                                      permissoes: { ...novoProfessor.permissoes, editarFaltas: checked },
                                    })
                                  }
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label>Visualizar Relatórios</Label>
                                  <p className="text-sm text-gray-500">Permitir acesso aos relatórios do sistema</p>
                                </div>
                                <Switch
                                  checked={novoProfessor.permissoes.verRelatorios}
                                  onCheckedChange={(checked) =>
                                    setNovoProfessor({
                                      ...novoProfessor,
                                      permissoes: { ...novoProfessor.permissoes, verRelatorios: checked },
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setIsAddProfessorOpen(false)}>
                              Cancelar
                            </Button>
                            <Button type="submit">Cadastrar Professor</Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Input
                        placeholder="Buscar professor..."
                        value={searchProfessor}
                        onChange={(e) => setSearchProfessor(e.target.value)}
                        className="max-w-sm"
                      />
                    </div>

                    <div className="border rounded-lg">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="border-b bg-gray-50">
                            <tr>
                              <th className="text-left p-4 font-medium">Professor</th>
                              <th className="text-left p-4 font-medium">Disciplinas</th>
                              <th className="text-left p-4 font-medium">Turmas</th>
                              <th className="text-left p-4 font-medium">Status</th>
                              <th className="text-left p-4 font-medium">Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredProfessores.map((professor) => (
                              <tr key={professor.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                  <div>
                                    <div className="font-medium">{professor.nome}</div>
                                    <div className="text-sm text-gray-500">{professor.email}</div>
                                    <div className="text-sm text-gray-500">{professor.telefone}</div>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="flex flex-wrap gap-1">
                                    {professor.disciplinas.map((disciplina) => (
                                      <Badge key={disciplina} variant="secondary" className="text-xs">
                                        {disciplina}
                                      </Badge>
                                    ))}
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="flex flex-wrap gap-1">
                                    {professor.turmas.map((turma) => (
                                      <Badge key={turma} variant="outline" className="text-xs">
                                        {turma}
                                      </Badge>
                                    ))}
                                  </div>
                                </td>
                                <td className="p-4">
                                  <Badge
                                    variant={professor.status === "ativo" ? "default" : "secondary"}
                                    className={
                                      professor.status === "ativo"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                    }
                                  >
                                    {professor.status === "ativo" ? "Ativo" : "Inativo"}
                                  </Badge>
                                </td>
                                <td className="p-4">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleEditProfessor(professor)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Editar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => toggleProfessorStatus(professor.id)}>
                                        {professor.status === "ativo" ? (
                                          <>
                                            <EyeOff className="h-4 w-4 mr-2" />
                                            Desativar
                                          </>
                                        ) : (
                                          <>
                                            <Eye className="h-4 w-4 mr-2" />
                                            Ativar
                                          </>
                                        )}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleDeleteProfessor(professor.id)}
                                        className="text-red-600"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Excluir
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dialog de Edição */}
              <Dialog open={isEditProfessorOpen} onOpenChange={setIsEditProfessorOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Editar Professor</DialogTitle>
                    <DialogDescription>Atualize as informações e permissões do professor</DialogDescription>
                  </DialogHeader>
                  {selectedProfessor && (
                    <form onSubmit={handleUpdateProfessor} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-nome">Nome Completo</Label>
                          <Input
                            id="edit-nome"
                            value={selectedProfessor.nome}
                            onChange={(e) => setSelectedProfessor({ ...selectedProfessor, nome: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-email">E-mail</Label>
                          <Input
                            id="edit-email"
                            type="email"
                            value={selectedProfessor.email}
                            onChange={(e) => setSelectedProfessor({ ...selectedProfessor, email: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-telefone">Telefone</Label>
                          <Input
                            id="edit-telefone"
                            value={selectedProfessor.telefone}
                            onChange={(e) => setSelectedProfessor({ ...selectedProfessor, telefone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-status">Status</Label>
                          <select
                            id="edit-status"
                            value={selectedProfessor.status}
                            onChange={(e) => setSelectedProfessor({ ...selectedProfessor, status: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                          </select>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Disciplinas</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {mockDisciplinasDisponiveis.map((disciplina) => (
                            <div key={disciplina} className="flex items-center space-x-2">
                              <Checkbox
                                id={`edit-disciplina-${disciplina}`}
                                checked={selectedProfessor.disciplinas.includes(disciplina)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedProfessor({
                                      ...selectedProfessor,
                                      disciplinas: [...selectedProfessor.disciplinas, disciplina],
                                    })
                                  } else {
                                    setSelectedProfessor({
                                      ...selectedProfessor,
                                      disciplinas: selectedProfessor.disciplinas.filter((d) => d !== disciplina),
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={`edit-disciplina-${disciplina}`} className="text-sm">
                                {disciplina}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Turmas</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {mockTurmasDisponiveis.map((turma) => (
                            <div key={turma} className="flex items-center space-x-2">
                              <Checkbox
                                id={`edit-turma-${turma}`}
                                checked={selectedProfessor.turmas.includes(turma)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedProfessor({
                                      ...selectedProfessor,
                                      turmas: [...selectedProfessor.turmas, turma],
                                    })
                                  } else {
                                    setSelectedProfessor({
                                      ...selectedProfessor,
                                      turmas: selectedProfessor.turmas.filter((t) => t !== turma),
                                    })
                                  }
                                }}
                              />
                              <Label htmlFor={`edit-turma-${turma}`} className="text-sm">
                                {turma}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Permissões</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Visualizar Alunos</Label>
                              <p className="text-sm text-gray-500">Permitir visualizar informações dos alunos</p>
                            </div>
                            <Switch
                              checked={selectedProfessor.permissoes.verAlunos}
                              onCheckedChange={(checked) =>
                                setSelectedProfessor({
                                  ...selectedProfessor,
                                  permissoes: { ...selectedProfessor.permissoes, verAlunos: checked },
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Visualizar Notas</Label>
                              <p className="text-sm text-gray-500">Permitir visualizar notas dos alunos</p>
                            </div>
                            <Switch
                              checked={selectedProfessor.permissoes.verNotas}
                              onCheckedChange={(checked) =>
                                setSelectedProfessor({
                                  ...selectedProfessor,
                                  permissoes: { ...selectedProfessor.permissoes, verNotas: checked },
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Editar Notas</Label>
                              <p className="text-sm text-gray-500">Permitir editar e adicionar notas</p>
                            </div>
                            <Switch
                              checked={selectedProfessor.permissoes.editarNotas}
                              onCheckedChange={(checked) =>
                                setSelectedProfessor({
                                  ...selectedProfessor,
                                  permissoes: { ...selectedProfessor.permissoes, editarNotas: checked },
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Visualizar Faltas</Label>
                              <p className="text-sm text-gray-500">Permitir visualizar faltas dos alunos</p>
                            </div>
                            <Switch
                              checked={selectedProfessor.permissoes.verFaltas}
                              onCheckedChange={(checked) =>
                                setSelectedProfessor({
                                  ...selectedProfessor,
                                  permissoes: { ...selectedProfessor.permissoes, verFaltas: checked },
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Editar Faltas</Label>
                              <p className="text-sm text-gray-500">Permitir editar e registrar faltas</p>
                            </div>
                            <Switch
                              checked={selectedProfessor.permissoes.editarFaltas}
                              onCheckedChange={(checked) =>
                                setSelectedProfessor({
                                  ...selectedProfessor,
                                  permissoes: { ...selectedProfessor.permissoes, editarFaltas: checked },
                                })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Visualizar Relatórios</Label>
                              <p className="text-sm text-gray-500">Permitir acesso aos relatórios do sistema</p>
                            </div>
                            <Switch
                              checked={selectedProfessor.permissoes.verRelatorios}
                              onCheckedChange={(checked) =>
                                setSelectedProfessor({
                                  ...selectedProfessor,
                                  permissoes: { ...selectedProfessor.permissoes, verRelatorios: checked },
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsEditProfessorOpen(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">Salvar Alterações</Button>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
