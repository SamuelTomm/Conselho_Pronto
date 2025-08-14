"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
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
  Eye,
  GraduationCap,
  ArrowLeft,
  UserCheck,
  FileBarChart,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Dados simulados das turmas
const turmasData = [
  {
    id: 1,
    codigo: "3A2024",
    nome: "3º Ano A",
    nivel: "Ensino Médio",
    ano: "2024",
    periodo: "Matutino",
    conselheiro: "Prof. Maria Silva",
    sala: "Sala 101",
    alunos: 28,
    disciplinas: 12,
    cor: "blue",
    descricao: "Turma do 3º ano do Ensino Médio - turno matutino",
    status: "Ativa",
  },
  {
    id: 2,
    codigo: "2B2024",
    nome: "2º Ano B",
    nivel: "Ensino Médio",
    ano: "2024",
    periodo: "Vespertino",
    conselheiro: "Prof. João Santos",
    sala: "Sala 205",
    alunos: 30,
    disciplinas: 11,
    cor: "green",
    descricao: "Turma do 2º ano do Ensino Médio - turno vespertino",
    status: "Ativa",
  },
  {
    id: 3,
    codigo: "1C2024",
    nome: "1º Ano C",
    nivel: "Ensino Médio",
    ano: "2024",
    periodo: "Matutino",
    conselheiro: "Prof. Ana Costa",
    sala: "Sala 103",
    alunos: 25,
    disciplinas: 10,
    cor: "purple",
    descricao: "Turma do 1º ano do Ensino Médio - turno matutino",
    status: "Inativa",
  },
  {
    id: 4,
    codigo: "1TI2024",
    nome: "1º Técnico em Informática",
    nivel: "Técnico",
    ano: "2024",
    periodo: "Integral",
    conselheiro: "Prof. Carlos Lima",
    sala: "Lab 01",
    alunos: 22,
    disciplinas: 15,
    cor: "orange",
    descricao: "Turma do curso técnico em informática - período integral",
    status: "Ativa",
  },
  {
    id: 5,
    codigo: "2TI2024",
    nome: "2º Técnico em Informática",
    nivel: "Técnico",
    ano: "2024",
    periodo: "Integral",
    conselheiro: "Prof. Lucia Ferreira",
    sala: "Lab 02",
    alunos: 20,
    disciplinas: 16,
    cor: "orange",
    descricao: "Turma do 2º ano do curso técnico em informática",
    status: "Ativa",
  },
  {
    id: 6,
    codigo: "1DES2024",
    nome: "1º Técnico em Design",
    nivel: "Técnico",
    ano: "2024",
    periodo: "Vespertino",
    conselheiro: "Prof. Roberto Silva",
    sala: "Atelier 01",
    alunos: 18,
    disciplinas: 14,
    cor: "pink",
    descricao: "Turma do curso técnico em design gráfico",
    status: "Ativa",
  },
  {
    id: 7,
    codigo: "9A2024",
    nome: "9º Ano A",
    nivel: "Fundamental",
    ano: "2024",
    periodo: "Matutino",
    conselheiro: "Prof. Sandra Oliveira",
    sala: "Sala 301",
    alunos: 32,
    disciplinas: 9,
    cor: "emerald",
    descricao: "Turma do 9º ano do Ensino Fundamental",
    status: "Ativa",
  },
]

// Dados simulados de alunos por turma
const alunosPorTurma = {
  1: [
    {
      id: 1,
      matricula: "2024001",
      nome: "Ana Silva Santos",
      email: "ana.santos@estudante.ivoti.edu.br",
      telefone: "(51) 99999-1111",
      responsavel: "Maria Santos",
      foto: "/placeholder.svg?height=40&width=40&text=AS",
      status: "Ativo",
      mediaGeral: 8.5,
      frequenciaGeral: 95,
      observacoes: "Aluna dedicada e participativa",
    },
    {
      id: 2,
      matricula: "2024002",
      nome: "Bruno Costa Lima",
      email: "bruno.lima@estudante.ivoti.edu.br",
      telefone: "(51) 99999-2222",
      responsavel: "João Lima",
      foto: "/placeholder.svg?height=40&width=40&text=BL",
      status: "Ativo",
      mediaGeral: 9.2,
      frequenciaGeral: 98,
      observacoes: "Excelente desempenho em exatas",
    },
    {
      id: 3,
      matricula: "2024003",
      nome: "Carla Oliveira Mendes",
      email: "carla.mendes@estudante.ivoti.edu.br",
      telefone: "(51) 99999-3333",
      responsavel: "Ana Mendes",
      foto: "/placeholder.svg?height=40&width=40&text=CM",
      status: "Ativo",
      mediaGeral: 7.8,
      frequenciaGeral: 92,
      observacoes: "Boa aluna, precisa melhorar a frequência",
    },
  ],
  2: [
    {
      id: 4,
      matricula: "2024004",
      nome: "Diego Ferreira Santos",
      email: "diego.santos@estudante.ivoti.edu.br",
      telefone: "(51) 99999-4444",
      responsavel: "Carlos Santos",
      foto: "/placeholder.svg?height=40&width=40&text=DS",
      status: "Ativo",
      mediaGeral: 8.8,
      frequenciaGeral: 96,
      observacoes: "Aluno interessado e questionador",
    },
    {
      id: 5,
      matricula: "2024005",
      nome: "Eduardo Mendes Silva",
      email: "eduardo.silva@estudante.ivoti.edu.br",
      telefone: "(51) 99999-5555",
      responsavel: "Lucia Silva",
      foto: "/placeholder.svg?height=40&width=40&text=ES",
      status: "Ativo",
      mediaGeral: 7.6,
      frequenciaGeral: 88,
      observacoes: "Bom potencial, precisa de mais dedicação",
    },
  ],
  4: [
    {
      id: 6,
      matricula: "2024006",
      nome: "Helena Cardoso Lima",
      email: "helena.lima@estudante.ivoti.edu.br",
      telefone: "(51) 99999-6666",
      responsavel: "Paulo Lima",
      foto: "/placeholder.svg?height=40&width=40&text=HL",
      status: "Ativo",
      mediaGeral: 9.5,
      frequenciaGeral: 100,
      observacoes: "Excelente em programação e lógica",
    },
    {
      id: 7,
      matricula: "2024007",
      nome: "Igor Nascimento",
      email: "igor.nascimento@estudante.ivoti.edu.br",
      telefone: "(51) 99999-7777",
      responsavel: "Sandra Nascimento",
      foto: "/placeholder.svg?height=40&width=40&text=IN",
      status: "Ativo",
      mediaGeral: 8.7,
      frequenciaGeral: 94,
      observacoes: "Muito criativo em projetos de desenvolvimento",
    },
  ],
}

const menuItems = [
  {
    id: "inicio",
    label: "Início",
    icon: Home,
    active: false,
    onClick: () => {
      window.location.href = "/dashboard"
    },
  },
  {
    id: "ciclos",
    label: "Ciclos",
    icon: Circle,
    active: false,
    onClick: () => {
      window.location.href = "/dashboard/ciclos"
    },
  },
  {
    id: "cursos",
    label: "Cursos",
    icon: FileText,
    active: false,
    onClick: () => {
      window.location.href = "/dashboard/cursos"
    },
  },
  {
    id: "alunos",
    label: "Alunos",
    icon: Users,
    active: false,
    onClick: () => {
      window.location.href = "/dashboard/alunos"
    },
  },
  {
    id: "disciplinas",
    label: "Disciplinas",
    icon: BookOpen,
    active: false,
    onClick: () => {
      window.location.href = "/dashboard/disciplinas"
    },
  },
  {
    id: "turmas",
    label: "Turmas",
    icon: Send,
    active: true,
    onClick: () => {
      window.location.href = "/dashboard/turmas"
    },
  },
  {
    id: "professores",
    label: "Professores",
    icon: UserCheck,
    active: false,
    onClick: () => {
      window.location.href = "/dashboard/professores"
    },
  },
]

const coresTurma = [
  { value: "blue", label: "Azul", class: "bg-blue-100 text-blue-800" },
  { value: "green", label: "Verde", class: "bg-green-100 text-green-800" },
  { value: "purple", label: "Roxo", class: "bg-purple-100 text-purple-800" },
  { value: "orange", label: "Laranja", class: "bg-orange-100 text-orange-800" },
  { value: "pink", label: "Rosa", class: "bg-pink-100 text-pink-800" },
  { value: "emerald", label: "Esmeralda", class: "bg-emerald-100 text-emerald-800" },
]

const periodos = [
  { value: "Matutino", label: "Matutino" },
  { value: "Vespertino", label: "Vespertino" },
  { value: "Noturno", label: "Noturno" },
  { value: "Integral", label: "Integral" },
]

const niveis = [
  { value: "Fundamental", label: "Ensino Fundamental" },
  { value: "Ensino Médio", label: "Ensino Médio" },
  { value: "Técnico", label: "Técnico" },
]

export default function TurmasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMenuItem, setActiveMenuItem] = useState("turmas")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    // Limpar dados de sessão (se houver)
    localStorage.removeItem("user")
    sessionStorage.clear()
    
    // Redirecionar para a página de login
    window.location.href = "/"
  }
  const [turmas, setTurmas] = useState(turmasData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTurma, setEditingTurma] = useState(null)
  const [selectedTurma, setSelectedTurma] = useState(null)
  const [viewMode, setViewMode] = useState<"list" | "alunos">("list")
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    nivel: "",
    ano: "2024",
    periodo: "",
    conselheiro: "",
    sala: "",
    descricao: "",
    cor: "blue",
  })
  const [error, setError] = useState("")
  const router = useRouter()

  const alunosTurma = selectedTurma ? alunosPorTurma[selectedTurma.id] || [] : []

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

  const filteredData = turmas.filter(
    (turma) =>
      turma.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.nivel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.conselheiro.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredData.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const paginatedData = filteredData.slice(startIndex, startIndex + Number.parseInt(itemsPerPage))

  const getCorClass = (cor: string) => {
    const corObj = coresTurma.find((c) => c.value === cor)
    return corObj ? corObj.class : "bg-gray-100 text-gray-800"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.codigo || !formData.nome || !formData.nivel || !formData.periodo) {
      setError("Código, nome, nível e período são obrigatórios")
      return
    }

    if (editingTurma) {
      // Editar turma existente
      setTurmas(
        turmas.map((turma) =>
          turma.id === editingTurma.id
            ? {
                ...turma,
                codigo: formData.codigo,
                nome: formData.nome,
                nivel: formData.nivel,
                ano: formData.ano,
                periodo: formData.periodo,
                conselheiro: formData.conselheiro,
                sala: formData.sala,
                descricao: formData.descricao,
                cor: formData.cor,
              }
            : turma,
        ),
      )
    } else {
      // Adicionar nova turma
      const newTurma = {
        id: Math.max(...turmas.map((t) => t.id)) + 1,
        codigo: formData.codigo,
        nome: formData.nome,
        nivel: formData.nivel,
        ano: formData.ano,
        periodo: formData.periodo,
        conselheiro: formData.conselheiro,
        sala: formData.sala,
        descricao: formData.descricao,
        cor: formData.cor,
        alunos: 0,
        disciplinas: 0,
        status: "Ativa",
      }
      setTurmas([...turmas, newTurma])
    }

    setIsDialogOpen(false)
    setEditingTurma(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      codigo: "",
      nome: "",
      nivel: "",
      ano: "2024",
      periodo: "",
      conselheiro: "",
      sala: "",
      descricao: "",
      cor: "blue",
    })
  }

  const handleEdit = (turma: any) => {
    setEditingTurma(turma)
    setFormData({
      codigo: turma.codigo,
      nome: turma.nome,
      nivel: turma.nivel,
      ano: turma.ano,
      periodo: turma.periodo,
      conselheiro: turma.conselheiro,
      sala: turma.sala,
      descricao: turma.descricao,
      cor: turma.cor,
    })
    setIsDialogOpen(true)
  }

  const handleViewAlunos = (turma: any) => {
    setSelectedTurma(turma)
    setViewMode("alunos")
  }

  const handleDelete = (id: number) => {
    setTurmas(turmas.filter((turma) => turma.id !== id))
  }

  const openNewDialog = () => {
    setEditingTurma(null)
    resetForm()
    setError("")
    setIsDialogOpen(true)
  }

  const getMediaColor = (media: number) => {
    if (media >= 8.0) return "text-green-600"
    if (media >= 6.0) return "text-yellow-600"
    return "text-red-600"
  }

  const getFrequenciaColor = (frequencia: number) => {
    if (frequencia >= 95) return "text-green-600"
    if (frequencia >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-slate-800 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out shadow-2xl`}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-blue-800/30">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded-xl shadow-lg">
              <School className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg">Conselho Pronto</span>
              <p className="text-blue-200 text-xs">Sistema de Gestão</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={item.onClick}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    item.active
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                      : "text-blue-100 hover:bg-blue-800/50 hover:text-white hover:transform hover:scale-105"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Área invisível para trigger da sidebar */}
      <div className="fixed left-0 top-0 w-5 h-full z-40 bg-transparent" onMouseEnter={() => setSidebarOpen(true)} />

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Turmas
                </h1>
                <p className="text-sm text-slate-600">Gestão de Turmas do Sistema</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50 transition-colors">
                    <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-2 rounded-full">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Prof. Maria Silva</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => (window.location.href = "/dashboard/configuracoes")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => (window.location.href = "/")}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {viewMode === "list" ? (
          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total de Turmas</p>
                      <p className="text-2xl font-bold text-blue-900">{turmas.length}</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-slate-50 to-white border-slate-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Turmas Ativas</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {turmas.filter((t) => t.status === "Ativa").length}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-500 to-slate-600 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Ensino Médio</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {turmas.filter((t) => t.nivel === "Ensino Médio").length}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-slate-50 to-white border-slate-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Ensino Fundamental</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {turmas.filter((t) => t.nivel === "Ensino Fundamental").length}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-500 to-slate-600 p-3 rounded-full">
                      <School className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-blue-900">Gerenciar Turmas</CardTitle>
                    <CardDescription>Visualize e gerencie todas as turmas do sistema</CardDescription>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={openNewDialog}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Turma
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto border-blue-200">
                      <DialogHeader>
                        <DialogTitle className="text-blue-900">
                          {editingTurma ? "Editar Turma" : "Nova Turma"}
                        </DialogTitle>
                        <DialogDescription>
                          {editingTurma ? "Edite as informações da turma." : "Adicione uma nova turma ao sistema."}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="codigo">Código</Label>
                              <Input
                                id="codigo"
                                value={formData.codigo}
                                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                                placeholder="Ex: 3A2024"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cor">Cor</Label>
                              <Select
                                value={formData.cor}
                                onValueChange={(value) => setFormData({ ...formData, cor: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {coresTurma.map((cor) => (
                                    <SelectItem key={cor.value} value={cor.value}>
                                      <div className="flex items-center space-x-2">
                                        <div className={`w-3 h-3 rounded-full ${cor.class}`} />
                                        <span>{cor.label}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="nome">Nome da Turma</Label>
                            <Input
                              id="nome"
                              value={formData.nome}
                              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                              placeholder="Ex: 3º Ano A"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="nivel">Nível</Label>
                              <Select
                                value={formData.nivel}
                                onValueChange={(value) => setFormData({ ...formData, nivel: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o nível" />
                                </SelectTrigger>
                                <SelectContent>
                                  {niveis.map((nivel) => (
                                    <SelectItem key={nivel.value} value={nivel.value}>
                                      {nivel.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="periodo">Período</Label>
                              <Select
                                value={formData.periodo}
                                onValueChange={(value) => setFormData({ ...formData, periodo: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o período" />
                                </SelectTrigger>
                                <SelectContent>
                                  {periodos.map((periodo) => (
                                    <SelectItem key={periodo.value} value={periodo.value}>
                                      {periodo.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="ano">Ano</Label>
                              <Select
                                value={formData.ano}
                                onValueChange={(value) => setFormData({ ...formData, ano: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2024">2024</SelectItem>
                                  <SelectItem value="2025">2025</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="sala">Sala</Label>
                              <Input
                                id="sala"
                                value={formData.sala}
                                onChange={(e) => setFormData({ ...formData, sala: e.target.value })}
                                placeholder="Ex: Sala 101"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="conselheiro">Professor Conselheiro</Label>
                            <Input
                              id="conselheiro"
                              value={formData.conselheiro}
                              onChange={(e) => setFormData({ ...formData, conselheiro: e.target.value })}
                              placeholder="Ex: Prof. Maria Silva"
                            />
                          </div>

                          <div>
                            <Label htmlFor="descricao">Descrição</Label>
                            <Textarea
                              id="descricao"
                              value={formData.descricao}
                              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                              placeholder="Descrição da turma..."
                              rows={3}
                            />
                          </div>
                        </div>
                        {error && (
                          <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                          >
                            {editingTurma ? "Salvar Alterações" : "Criar Turma"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Show</span>
                      <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-gray-600">entries</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Search:</span>
                    <Input
                      placeholder="Buscar turma..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>

                <div className="border rounded-lg bg-blue-50/30">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-100/50">
                        <TableHead className="text-blue-900 font-semibold">Nome</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Código</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Nível</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Período</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Conselheiro</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Alunos</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Status</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((turma) => (
                        <TableRow key={turma.id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{turma.nome}</span>
                              <span className="text-sm text-gray-500">{turma.sala}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{turma.codigo}</TableCell>
                          <TableCell>
                            <Badge className={getCorClass(turma.cor)}>{turma.nivel}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{turma.periodo}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{turma.conselheiro}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <GraduationCap className="h-4 w-4 text-gray-400" />
                              <span>{turma.alunos}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                turma.status === "Ativa" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }
                            >
                              {turma.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4 text-blue-600" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewAlunos(turma)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Alunos
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(turma)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(turma.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </main>
        ) : (
          // Detail view
          <div className="flex-1">
            <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={() => setViewMode("list")} className="hover:bg-blue-50">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Voltar
                    </Button>
                    <div>
                      <h1 className="text-xl font-semibold text-blue-900">{selectedTurma.nome}</h1>
                      <p className="text-sm text-blue-600">
                        {selectedTurma.codigo} - {selectedTurma.nivel} - {selectedTurma.periodo}
                      </p>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2 hover:bg-blue-50 transition-colors"
                      >
                        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-2 rounded-full">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Prof. Maria Silva</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => (window.location.href = "/dashboard/configuracoes")}>
                        <Settings className="mr-2 h-4 w-4" />
                        Configurações
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            <main className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Total de Alunos</p>
                        <p className="text-2xl font-bold text-blue-900">{alunosTurma.length}</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-slate-50 to-white border-slate-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Conselheiro</p>
                        <p className="text-lg font-bold text-slate-900">{selectedTurma.conselheiro}</p>
                      </div>
                      <div className="bg-gradient-to-r from-slate-500 to-slate-600 p-3 rounded-full">
                        <UserCheck className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Sala</p>
                        <p className="text-lg font-bold text-blue-900">{selectedTurma.sala}</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full">
                        <School className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Disciplinas</p>
                        <p className="text-2xl font-bold text-blue-900">{selectedTurma.disciplinas}</p>
                      </div>
                      <div className="bg-orange-100 p-3 rounded-full">
                        <BookOpen className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-blue-900">Alunos da Turma</CardTitle>
                      <CardDescription>Lista de alunos matriculados na turma {selectedTurma.nome}</CardDescription>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                      <FileBarChart className="h-4 w-4 mr-2" />
                      Conselho de Classe
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg bg-blue-50/30">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-100/50">
                          <TableHead className="text-blue-900 font-semibold">Nome</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Matrícula</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Média Geral</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Frequência</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Status</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {alunosTurma.map((aluno) => (
                          <TableRow key={aluno.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={aluno.foto || "/placeholder.svg"} alt={aluno.nome} />
                                  <AvatarFallback>
                                    {aluno.nome
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{aluno.nome}</div>
                                  <div className="text-sm text-gray-500">{aluno.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{aluno.matricula}</TableCell>
                            <TableCell>
                              <span className={`font-medium ${getMediaColor(aluno.mediaGeral)}`}>
                                {aluno.mediaGeral.toFixed(1)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`font-medium ${getFrequenciaColor(aluno.frequenciaGeral)}`}>
                                {aluno.frequenciaGeral}%
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">{aluno.status}</Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4 text-blue-600" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileBarChart className="h-4 w-4 mr-2" />
                                    Histórico
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </main>
          </div>
        )}
      </div>
    </div>
  )
}
