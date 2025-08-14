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
  DialogFooter,
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
  ChevronLeft,
  ChevronRight,
  School,
  Users,
  BookOpen,
  Home,
  Circle,
  FileText,
  Send,
  Eye,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileBarChart,
  X,
} from "lucide-react"

// Adicionar import do novo componente
import { AlunoEditForm } from "@/components/aluno-edit-form"

// Dados simulados dos alunos
const alunosData = [
  {
    id: 1,
    matricula: "2024001",
    nome: "Ana Silva Santos",
    email: "ana.santos@estudante.ivoti.edu.br",
    telefone: "(51) 99999-1111",
    dataNascimento: "2007-03-15",
    endereco: "Rua das Flores, 123 - Centro",
    turma: "3º A",
    curso: "Formação Básica",
    responsavel: "Maria Santos",
    telefoneResponsavel: "(51) 99999-1112",
    foto: "/placeholder.svg?height=40&width=40&text=AS",
    status: "Ativo",
    observacoes: "Aluna dedicada, participa ativamente das aulas.",
  },
  {
    id: 2,
    matricula: "2024002",
    nome: "Bruno Costa Lima",
    email: "bruno.lima@estudante.ivoti.edu.br",
    telefone: "(51) 99999-2222",
    dataNascimento: "2006-08-22",
    endereco: "Av. Principal, 456 - Bairro Novo",
    turma: "3º A",
    curso: "Itinerário de Exatas",
    responsavel: "João Lima",
    telefoneResponsavel: "(51) 99999-2223",
    foto: "/placeholder.svg?height=40&width=40&text=BL",
    status: "Ativo",
    observacoes: "Excelente em matemática e física.",
  },
  {
    id: 3,
    matricula: "2024003",
    nome: "Carla Oliveira Mendes",
    email: "carla.mendes@estudante.ivoti.edu.br",
    telefone: "(51) 99999-3333",
    dataNascimento: "2007-01-10",
    endereco: "Rua do Comércio, 789 - Vila Rica",
    turma: "2º B",
    curso: "Técnico em Design",
    responsavel: "Ana Mendes",
    telefoneResponsavel: "(51) 99999-3334",
    foto: "/placeholder.svg?height=40&width=40&text=CM",
    status: "Ativo",
    observacoes: "Muito criativa, destaque em projetos visuais.",
  },
  {
    id: 4,
    matricula: "2024004",
    nome: "Diego Ferreira Santos",
    email: "diego.santos@estudante.ivoti.edu.br",
    telefone: "(51) 99999-4444",
    dataNascimento: "2006-11-05",
    endereco: "Rua da Paz, 321 - Jardim Alegre",
    turma: "1º TI",
    curso: "Técnico em Informática",
    responsavel: "Carlos Santos",
    telefoneResponsavel: "(51) 99999-4445",
    foto: "/placeholder.svg?height=40&width=40&text=DS",
    status: "Ativo",
    observacoes: "Interesse em programação e desenvolvimento web.",
  },
  {
    id: 5,
    matricula: "2024005",
    nome: "Eduardo Mendes Silva",
    email: "eduardo.silva@estudante.ivoti.edu.br",
    telefone: "(51) 99999-5555",
    dataNascimento: "2007-06-18",
    endereco: "Av. das Palmeiras, 654 - Centro",
    turma: "2º A",
    curso: "Itinerário de Humanas",
    responsavel: "Lucia Silva",
    telefoneResponsavel: "(51) 99999-5556",
    foto: "/placeholder.svg?height=40&width=40&text=ES",
    status: "Ativo",
    observacoes: "Excelente redator, participa de debates.",
  },
  {
    id: 6,
    matricula: "2024006",
    nome: "Fernanda Rocha Costa",
    email: "fernanda.costa@estudante.ivoti.edu.br",
    telefone: "(51) 99999-6666",
    dataNascimento: "2006-12-03",
    endereco: "Rua dos Ipês, 987 - Vila Nova",
    turma: "3º B",
    curso: "Técnico em Agropecuária",
    responsavel: "Roberto Costa",
    telefoneResponsavel: "(51) 99999-6667",
    foto: "/placeholder.svg?height=40&width=40&text=FC",
    status: "Ativo",
    observacoes: "Interesse em sustentabilidade e agricultura.",
  },
  {
    id: 7,
    matricula: "2024007",
    nome: "Gabriel Torres Oliveira",
    email: "gabriel.oliveira@estudante.ivoti.edu.br",
    telefone: "(51) 99999-7777",
    dataNascimento: "2007-04-25",
    endereco: "Rua das Acácias, 147 - Bela Vista",
    turma: "2º A",
    curso: "Formação Básica",
    responsavel: "Sandra Oliveira",
    telefoneResponsavel: "(51) 99999-7778",
    foto: "/placeholder.svg?height=40&width=40&text=GO",
    status: "Ativo",
    observacoes: "Bom relacionamento com colegas.",
  },
  {
    id: 8,
    matricula: "2024008",
    nome: "Helena Cardoso Lima",
    email: "helena.lima@estudante.ivoti.edu.br",
    telefone: "(51) 99999-8888",
    dataNascimento: "2006-09-12",
    endereco: "Av. Central, 258 - Centro",
    turma: "1º TI",
    curso: "Técnico em Informática",
    responsavel: "Paulo Lima",
    telefoneResponsavel: "(51) 99999-8889",
    foto: "/placeholder.svg?height=40&width=40&text=HL",
    status: "Ativo",
    observacoes: "Destaque em lógica de programação.",
  },
]

const menuItems = [
  { id: "inicio", label: "Início", icon: Home, active: false },
  { id: "ciclos", label: "Ciclos", icon: Circle, active: false },
  { id: "cursos", label: "Cursos", icon: FileText, active: false },
  { id: "alunos", label: "Alunos", icon: Users, active: true },
  { id: "disciplinas", label: "Disciplinas", icon: BookOpen, active: false },
  { id: "turmas", label: "Turmas", icon: Send, active: false },
]

const statusOptions = [
  { value: "Ativo", label: "Ativo", color: "bg-green-100 text-green-800" },
  { value: "Inativo", label: "Inativo", color: "bg-red-100 text-red-800" },
  { value: "Transferido", label: "Transferido", color: "bg-yellow-100 text-yellow-800" },
]

const cursosOptions = [
  "Formação Básica",
  "Itinerário de Exatas",
  "Itinerário de Humanas",
  "Técnico em Informática",
  "Técnico em Design",
  "Técnico em Agropecuária",
]

// Adicionar dados simulados de disciplinas
const disciplinasOptions = [
  "Matemática",
  "Português",
  "História",
  "Geografia",
  "Física",
  "Química",
  "Biologia",
  "Inglês",
  "Educação Física",
  "Arte",
  "Filosofia",
  "Sociologia",
]

// Adicionar dados simulados de notas por aluno
const notasPorAluno = {
  1: [
    {
      disciplina: "Matemática",
      n1: 8.5,
      n2: 7.8,
      n3: 8.2,
      n4: null,
      recuperacao: null,
      media: 8.17,
      observacoes: "Boa evolução",
    },
    {
      disciplina: "Português",
      n1: 9.0,
      n2: 8.5,
      n3: 8.8,
      n4: null,
      recuperacao: null,
      media: 8.77,
      observacoes: "Excelente redação",
    },
    {
      disciplina: "História",
      n1: 7.5,
      n2: 8.0,
      n3: 7.8,
      n4: null,
      recuperacao: null,
      media: 7.77,
      observacoes: "Participativo",
    },
  ],
  2: [
    {
      disciplina: "Matemática",
      n1: 9.2,
      n2: 8.7,
      n3: 9.0,
      n4: null,
      recuperacao: null,
      media: 8.97,
      observacoes: "Destaque na turma",
    },
    {
      disciplina: "Física",
      n1: 8.8,
      n2: 9.1,
      n3: 8.9,
      n4: null,
      recuperacao: null,
      media: 8.93,
      observacoes: "Muito bom em cálculos",
    },
  ],
}

// Adicionar dados simulados de faltas por aluno
const faltasPorAluno = {
  1: [
    { disciplina: "Matemática", data: "2024-03-15", justificada: true, observacoes: "Consulta médica" },
    { disciplina: "História", data: "2024-03-20", justificada: false, observacoes: "" },
    { disciplina: "Português", data: "2024-04-02", justificada: true, observacoes: "Problema familiar" },
  ],
  2: [{ disciplina: "Física", data: "2024-03-10", justificada: true, observacoes: "Viagem escolar" }],
}

export default function AlunosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMenuItem, setActiveMenuItem] = useState("alunos")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    // Limpar dados de sessão (se houver)
    localStorage.removeItem("user")
    sessionStorage.clear()
    
    // Redirecionar para a página de login
    window.location.href = "/"
  }
  const [alunos, setAlunos] = useState(alunosData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [editingAluno, setEditingAluno] = useState<any>(null)
  const [viewingAluno, setViewingAluno] = useState<any>(null)
  const [formData, setFormData] = useState({
    matricula: "",
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    endereco: "",
    turma: "",
    curso: "",
    responsavel: "",
    telefoneResponsavel: "",
    status: "Ativo",
    observacoes: "",
  })
  const [error, setError] = useState("")
  const [isNotasDialogOpen, setIsNotasDialogOpen] = useState(false)
  const [selectedAlunoNotas, setSelectedAlunoNotas] = useState<any>(null)
  const [notasData, setNotasData] = useState({
    disciplina: "",
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    recuperacao: "",
    observacoes: "",
  })
  const [faltasData, setFaltasData] = useState({
    disciplina: "",
    dataFalta: "",
    justificada: false,
    observacoes: "",
  })

  // Adicionar estado para o formulário de edição completo
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)
  const [editingAlunoCompleto, setEditingAlunoCompleto] = useState<any>(null)

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

  const filteredData = alunos.filter(
    (aluno) =>
      aluno.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.turma.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.curso.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredData.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const paginatedData = filteredData.slice(startIndex, startIndex + Number.parseInt(itemsPerPage))

  const getStatusColor = (status: string) => {
    const statusObj = statusOptions.find((s) => s.value === status)
    return statusObj ? statusObj.color : "bg-gray-100 text-gray-800"
  }

  const getMediaColor = (media: number) => {
    if (media >= 7.0) return "text-green-600"
    if (media >= 6.0) return "text-yellow-600"
    return "text-red-600"
  }

  // Adicionar função para abrir dialog de notas
  const handleViewNotas = (aluno: any) => {
    setSelectedAlunoNotas(aluno)
    setIsNotasDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.matricula || !formData.nome || !formData.turma || !formData.curso) {
      setError("Matrícula, nome, turma e curso são obrigatórios")
      return
    }

    if (editingAluno) {
      // Editar aluno existente
      setAlunos(
        alunos.map((aluno) =>
          aluno.id === editingAluno.id
            ? {
                ...aluno,
                ...formData,
                foto: `/placeholder.svg?height=40&width=40&text=${formData.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}`,
              }
            : aluno,
        ),
      )
    } else {
      // Adicionar novo aluno
      const newAluno = {
        id: Math.max(...alunos.map((a) => a.id)) + 1,
        ...formData,
        foto: `/placeholder.svg?height=40&width=40&text=${formData.nome
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()}`,
      }
      setAlunos([...alunos, newAluno])
    }

    setIsDialogOpen(false)
    setEditingAluno(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      matricula: "",
      nome: "",
      email: "",
      telefone: "",
      dataNascimento: "",
      endereco: "",
      turma: "",
      curso: "",
      responsavel: "",
      telefoneResponsavel: "",
      status: "Ativo",
      observacoes: "",
    })
  }

  // Substituir a função handleEdit existente por:
  const handleEdit = (aluno: any) => {
    setEditingAlunoCompleto(aluno)
    setIsEditFormOpen(true)
  }

  const handleView = (aluno: any) => {
    setViewingAluno(aluno)
    setIsViewDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setAlunos(alunos.filter((aluno) => aluno.id !== id))
  }

  const openNewDialog = () => {
    setEditingAluno(null)
    resetForm()
    setError("")
    setIsDialogOpen(true)
  }

  // Adicionar função para salvar aluno editado
  const handleSaveAlunoCompleto = (alunoData: any) => {
    setAlunos(alunos.map((aluno) => (aluno.id === alunoData.id ? alunoData : aluno)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-slate-800 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out shadow-xl`}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg shadow-md">
              <School className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-sm">Conselho Pronto</span>
              <p className="text-blue-200 text-xs">Sistema de Gestão</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-blue-800"
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
                      } else if (item.id === "disciplinas") {
                        window.location.href = "/dashboard/disciplinas"
                      } else if (item.id === "turmas") {
                        window.location.href = "/dashboard/turmas"
                      } else if (item.id === "professores") {
                        window.location.href = "/dashboard/professores"
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-105"
                        : "text-blue-100 hover:bg-blue-800 hover:text-white hover:transform hover:scale-105"
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
        <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-slate-700 bg-clip-text text-transparent">
                  Alunos
                </h1>
                <p className="text-sm text-slate-600 font-medium">Conselho Pronto - Sistema de Gestão Educacional</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50 transition-colors">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-full shadow-md">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Prof. Maria Silva</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => (window.location.href = "/dashboard/configuracoes")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Alunos</p>
                    <p className="text-2xl font-bold text-gray-900">{alunos.length}</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-full">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Alunos Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {alunos.filter((a) => a.status === "Ativo").length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cursos Técnicos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {alunos.filter((a) => a.curso.includes("Técnico")).length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-slate-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Turmas</p>
                    <p className="text-2xl font-bold text-gray-900">{new Set(alunos.map((a) => a.turma)).size}</p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-full">
                    <School className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestão de Alunos</CardTitle>
                  <CardDescription>Visualize e gerencie todos os alunos sob sua responsabilidade</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={openNewDialog}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Aluno
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingAluno ? "Editar Aluno" : "Novo Aluno"}</DialogTitle>
                      <DialogDescription>
                        {editingAluno ? "Edite as informações do aluno." : "Adicione um novo aluno ao sistema."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="matricula">Matrícula</Label>
                            <Input
                              id="matricula"
                              value={formData.matricula}
                              onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                              placeholder="Ex: 2024001"
                            />
                          </div>
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                              value={formData.status}
                              onValueChange={(value) => setFormData({ ...formData, status: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((status) => (
                                  <SelectItem key={status.value} value={status.value}>
                                    {status.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="nome">Nome Completo</Label>
                          <Input
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            placeholder="Nome completo do aluno"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="email@estudante.ivoti.edu.br"
                            />
                          </div>
                          <div>
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input
                              id="telefone"
                              value={formData.telefone}
                              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                              placeholder="(51) 99999-9999"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                            <Input
                              id="dataNascimento"
                              type="date"
                              value={formData.dataNascimento}
                              onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="turma">Turma</Label>
                            <Input
                              id="turma"
                              value={formData.turma}
                              onChange={(e) => setFormData({ ...formData, turma: e.target.value })}
                              placeholder="Ex: 3º A"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="curso">Curso</Label>
                          <Select
                            value={formData.curso}
                            onValueChange={(value) => setFormData({ ...formData, curso: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o curso" />
                            </SelectTrigger>
                            <SelectContent>
                              {cursosOptions.map((curso) => (
                                <SelectItem key={curso} value={curso}>
                                  {curso}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="endereco">Endereço</Label>
                          <Input
                            id="endereco"
                            value={formData.endereco}
                            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                            placeholder="Endereço completo"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="responsavel">Responsável</Label>
                            <Input
                              id="responsavel"
                              value={formData.responsavel}
                              onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                              placeholder="Nome do responsável"
                            />
                          </div>
                          <div>
                            <Label htmlFor="telefoneResponsavel">Telefone do Responsável</Label>
                            <Input
                              id="telefoneResponsavel"
                              value={formData.telefoneResponsavel}
                              onChange={(e) => setFormData({ ...formData, telefoneResponsavel: e.target.value })}
                              placeholder="(51) 99999-9999"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="observacoes">Observações</Label>
                          <Textarea
                            id="observacoes"
                            value={formData.observacoes}
                            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                            placeholder="Observações sobre o aluno..."
                            rows={3}
                          />
                        </div>
                      </div>
                      {error && (
                        <Alert variant="destructive" className="mb-4">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <DialogFooter>
                        <Button type="submit">{editingAluno ? "Salvar" : "Adicionar"}</Button>
                      </DialogFooter>
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
                    placeholder="Buscar aluno..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aluno</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Turma</TableHead>
                      <TableHead>Curso</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-20 text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((aluno) => (
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
                          <Badge variant="outline">{aluno.turma}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{aluno.curso}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(aluno.status)}>{aluno.status}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4 text-blue-600" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewNotas(aluno)}>
                                <FileBarChart className="h-4 w-4 mr-2" />
                                Notas e Faltas
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleView(aluno)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              {/* Substituir o DropdownMenuItem de "Editar" no menu de ações por: */}
                              <DropdownMenuItem onClick={() => handleEdit(aluno)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar Completo
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(aluno.id)}>
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

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + Number.parseInt(itemsPerPage), filteredData.length)} of {filteredData.length}{" "}
                  entries
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Dialog para Notas e Faltas */}
      <Dialog open={isNotasDialogOpen} onOpenChange={setIsNotasDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Notas e Faltas - {selectedAlunoNotas?.nome}</DialogTitle>
            <DialogDescription>
              Matrícula: {selectedAlunoNotas?.matricula} | Turma: {selectedAlunoNotas?.turma}
            </DialogDescription>
          </DialogHeader>

          {selectedAlunoNotas && (
            <div className="space-y-6">
              {/* Tabs para Notas e Faltas */}
              <div className="border-b">
                <nav className="-mb-px flex space-x-8">
                  <button className="border-b-2 border-blue-500 py-2 px-1 text-sm font-medium text-blue-600">
                    Notas por Disciplina
                  </button>
                  <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Registro de Faltas
                  </button>
                </nav>
              </div>

              {/* Seção de Notas */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Notas por Disciplina</h3>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Nota
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Disciplina</TableHead>
                        <TableHead>N1</TableHead>
                        <TableHead>N2</TableHead>
                        <TableHead>N3</TableHead>
                        <TableHead>N4</TableHead>
                        <TableHead>Rec.</TableHead>
                        <TableHead>Média</TableHead>
                        <TableHead>Situação</TableHead>
                        <TableHead className="w-20">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(notasPorAluno[selectedAlunoNotas.id as keyof typeof notasPorAluno] || []).map((nota, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{nota.disciplina}</TableCell>
                          <TableCell>{nota.n1?.toFixed(1) || "-"}</TableCell>
                          <TableCell>{nota.n2?.toFixed(1) || "-"}</TableCell>
                          <TableCell>{nota.n3?.toFixed(1) || "-"}</TableCell>
                          <TableCell>{nota.n4?.toFixed(1) || "-"}</TableCell>
                          <TableCell>{nota.recuperacao?.toFixed(1) || "-"}</TableCell>
                          <TableCell>
                            <span className={`font-medium ${getMediaColor(nota.media)}`}>{nota.media.toFixed(2)}</span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={nota.media >= 6.0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                            >
                              {nota.media >= 6.0 ? "Aprovado" : "Reprovado"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar Notas
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Detalhes
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Seção de Faltas */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Registro de Faltas</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Falta
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Disciplina</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Observações</TableHead>
                        <TableHead className="w-20">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(faltasPorAluno[selectedAlunoNotas.id as keyof typeof faltasPorAluno] || []).map(
                        (falta, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {new Date(falta.data).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell>{falta.disciplina}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  falta.justificada ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }
                              >
                                {falta.justificada ? "Justificada" : "Não Justificada"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {falta.observacoes || "Sem observações"}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Resumo de Faltas */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">
                          {(faltasPorAluno[selectedAlunoNotas.id as keyof typeof faltasPorAluno] || []).length}
                        </p>
                        <p className="text-sm text-gray-600">Total de Faltas</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {
                            (faltasPorAluno[selectedAlunoNotas.id as keyof typeof faltasPorAluno] || []).filter(
                              (f) => f.justificada,
                            ).length
                          }
                        </p>
                        <p className="text-sm text-gray-600">Justificadas</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">
                          {
                            (faltasPorAluno[selectedAlunoNotas.id as keyof typeof faltasPorAluno] || []).filter(
                              (f) => !f.justificada,
                            ).length
                          }
                        </p>
                        <p className="text-sm text-gray-600">Não Justificadas</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotasDialogOpen(false)}>
              Fechar
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <FileBarChart className="h-4 w-4 mr-2" />
              Gerar Relatório
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Formulário Completo de Edição */}
      {editingAlunoCompleto && (
        <AlunoEditForm
          aluno={editingAlunoCompleto}
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false)
            setEditingAlunoCompleto(null)
          }}
          onSave={handleSaveAlunoCompleto}
        />
      )}

      {/* Dialog para visualizar aluno */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Aluno</DialogTitle>
            <DialogDescription>Informações completas do aluno</DialogDescription>
          </DialogHeader>
          {viewingAluno && (
            <div className="space-y-6">
              {/* Foto e Info Básica */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={viewingAluno.foto || "/placeholder.svg"} alt={viewingAluno.nome} />
                  <AvatarFallback className="text-lg">
                    {viewingAluno.nome
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{viewingAluno.nome}</h3>
                  <p className="text-gray-600">Matrícula: {viewingAluno.matricula}</p>
                  <Badge className={getStatusColor(viewingAluno.status)}>{viewingAluno.status}</Badge>
                </div>
              </div>

              {/* Informações Acadêmicas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Informações Acadêmicas</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <School className="h-4 w-4 text-gray-400" />
                      <span>Turma: {viewingAluno.turma}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                      <span>Curso: {viewingAluno.curso}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Nascimento: {new Date(viewingAluno.dataNascimento).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contato</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{viewingAluno.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{viewingAluno.telefone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{viewingAluno.endereco}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsável */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Responsável</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Nome:</span> {viewingAluno.responsavel}
                    </div>
                    <div>
                      <span className="font-medium">Telefone:</span> {viewingAluno.telefoneResponsavel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Observações */}
              {viewingAluno.observacoes && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Observações</h4>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{viewingAluno.observacoes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => viewingAluno && handleEdit(viewingAluno)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar Aluno
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
