"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  Eye,
  GraduationCap,
  Clock,
  Calendar,
  ArrowLeft,
  UserCheck,
} from "lucide-react"

// Dados simulados das disciplinas do professor
const disciplinasData = [
  {
    id: 1,
    codigo: "MAT301",
    nome: "Matemática III",
    curso: "Formação Básica",
    turmas: ["3º A", "3º B"],
    cargaHoraria: 80,
    periodo: "2024/1",
    totalAlunos: 45,
    descricao: "Funções, limites, derivadas e integrais",
    cor: "blue",
  },
  {
    id: 2,
    codigo: "FIS201",
    nome: "Física II",
    curso: "Itinerário de Exatas",
    turmas: ["2º A"],
    cargaHoraria: 60,
    periodo: "2024/1",
    totalAlunos: 28,
    descricao: "Eletromagnetismo e ondas",
    cor: "green",
  },
  {
    id: 3,
    codigo: "PROG101",
    nome: "Programação I",
    curso: "Técnico em Informática",
    turmas: ["1º TI", "2º TI"],
    cargaHoraria: 120,
    periodo: "2024/1",
    totalAlunos: 35,
    descricao: "Lógica de programação e algoritmos",
    cor: "orange",
  },
  {
    id: 4,
    codigo: "HIST201",
    nome: "História Contemporânea",
    curso: "Itinerário de Humanas",
    turmas: ["2º B"],
    cargaHoraria: 60,
    periodo: "2024/1",
    totalAlunos: 22,
    descricao: "História dos séculos XIX e XX",
    cor: "purple",
  },
  {
    id: 5,
    codigo: "DESIGN101",
    nome: "Design Gráfico I",
    curso: "Técnico em Design",
    turmas: ["1º DES"],
    cargaHoraria: 100,
    periodo: "2024/1",
    totalAlunos: 18,
    descricao: "Fundamentos do design visual",
    cor: "pink",
  },
]

// Dados simulados de alunos por disciplina
const alunosPorDisciplina = {
  1: [
    {
      id: 1,
      matricula: "2024001",
      nome: "Ana Silva Santos",
      turma: "3º A",
      email: "ana.santos@estudante.ivoti.edu.br",
      foto: "/placeholder.svg?height=40&width=40&text=AS",
      status: "Ativo",
      notas: { n1: 8.5, n2: 7.8, n3: null, media: 8.15 },
      frequencia: 95,
    },
    {
      id: 2,
      matricula: "2024002",
      nome: "Bruno Costa Lima",
      turma: "3º A",
      email: "bruno.lima@estudante.ivoti.edu.br",
      foto: "/placeholder.svg?height=40&width=40&text=BL",
      status: "Ativo",
      notas: { n1: 9.2, n2: 8.7, n3: null, media: 8.95 },
      frequencia: 98,
    },
    {
      id: 3,
      matricula: "2024003",
      nome: "Carla Oliveira Mendes",
      turma: "3º B",
      email: "carla.mendes@estudante.ivoti.edu.br",
      foto: "/placeholder.svg?height=40&width=40&text=CM",
      status: "Ativo",
      notas: { n1: 7.5, n2: 8.2, n3: null, media: 7.85 },
      frequencia: 92,
    },
  ],
  2: [
    {
      id: 4,
      matricula: "2024004",
      nome: "Diego Ferreira Santos",
      turma: "2º A",
      email: "diego.santos@estudante.ivoti.edu.br",
      foto: "/placeholder.svg?height=40&width=40&text=DS",
      status: "Ativo",
      notas: { n1: 8.8, n2: 9.1, n3: null, media: 8.95 },
      frequencia: 96,
    },
    {
      id: 5,
      matricula: "2024005",
      nome: "Eduardo Mendes Silva",
      turma: "2º A",
      email: "eduardo.silva@estudante.ivoti.edu.br",
      foto: "/placeholder.svg?height=40&width=40&text=ES",
      status: "Ativo",
      notas: { n1: 7.2, n2: 8.0, n3: null, media: 7.6 },
      frequencia: 88,
    },
  ],
  3: [
    {
      id: 6,
      matricula: "2024006",
      nome: "Helena Cardoso Lima",
      turma: "1º TI",
      email: "helena.lima@estudante.ivoti.edu.br",
      foto: "/placeholder.svg?height=40&width=40&text=HL",
      status: "Ativo",
      notas: { n1: 9.5, n2: 9.2, n3: null, media: 9.35 },
      frequencia: 100,
    },
    {
      id: 7,
      matricula: "2024007",
      nome: "Igor Nascimento",
      turma: "2º TI",
      email: "igor.nascimento@estudante.ivoti.edu.br",
      foto: "/placeholder.svg?height=40&width=40&text=IN",
      status: "Ativo",
      notas: { n1: 8.7, n2: 8.9, n3: null, media: 8.8 },
      frequencia: 94,
    },
  ],
}

const menuItems = [
  { id: "inicio", label: "Início", icon: Home, active: false },
  { id: "ciclos", label: "Ciclos", icon: Circle, active: false },
  { id: "cursos", label: "Cursos", icon: FileText, active: false },
  { id: "alunos", label: "Alunos", icon: Users, active: false },
  { id: "disciplinas", label: "Disciplinas", icon: BookOpen, active: true },
  { id: "turmas", label: "Turmas", icon: Send, active: false },
  { id: "professores", label: "Professores", icon: UserCheck, active: false },
]

const coresDisciplina = [
  { value: "blue", label: "Azul", class: "bg-blue-100 text-blue-800" },
  { value: "green", label: "Verde", class: "bg-green-100 text-green-800" },
  { value: "purple", label: "Roxo", class: "bg-purple-100 text-purple-800" },
  { value: "orange", label: "Laranja", class: "bg-orange-100 text-orange-800" },
  { value: "pink", label: "Rosa", class: "bg-pink-100 text-pink-800" },
  { value: "emerald", label: "Esmeralda", class: "bg-emerald-100 text-emerald-800" },
]

export default function DisciplinasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMenuItem, setActiveMenuItem] = useState("disciplinas")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [disciplinas, setDisciplinas] = useState(disciplinasData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAlunosDialogOpen, setIsAlunosDialogOpen] = useState(false)
  const [editingDisciplina, setEditingDisciplina] = useState<any>(null)
  const [selectedDisciplina, setSelectedDisciplina] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"list" | "alunos">("list")
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    curso: "",
    turmas: "",
    cargaHoraria: "",
    periodo: "2024/1",
    descricao: "",
    cor: "blue",
  })
  const [error, setError] = useState("")

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

  const filteredData = disciplinas.filter(
    (disciplina) =>
      disciplina.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disciplina.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disciplina.curso.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredData.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const paginatedData = filteredData.slice(startIndex, startIndex + Number.parseInt(itemsPerPage))

  const getCorClass = (cor: string) => {
    const corObj = coresDisciplina.find((c) => c.value === cor)
    return corObj ? corObj.class : "bg-gray-100 text-gray-800"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.codigo || !formData.nome || !formData.curso) {
      setError("Código, nome e curso são obrigatórios")
      return
    }

    if (editingDisciplina) {
      // Editar disciplina existente
      setDisciplinas(
        disciplinas.map((disciplina) =>
          disciplina.id === editingDisciplina.id
            ? {
                ...disciplina,
                codigo: formData.codigo,
                nome: formData.nome,
                curso: formData.curso,
                turmas: formData.turmas.split(",").map((t) => t.trim()),
                cargaHoraria: Number.parseInt(formData.cargaHoraria),
                periodo: formData.periodo,
                descricao: formData.descricao,
                cor: formData.cor,
              }
            : disciplina,
        ),
      )
    } else {
      // Adicionar nova disciplina
      const newDisciplina = {
        id: Math.max(...disciplinas.map((d) => d.id)) + 1,
        codigo: formData.codigo,
        nome: formData.nome,
        curso: formData.curso,
        turmas: formData.turmas.split(",").map((t) => t.trim()),
        cargaHoraria: Number.parseInt(formData.cargaHoraria),
        periodo: formData.periodo,
        descricao: formData.descricao,
        cor: formData.cor,
        totalAlunos: 0,
      }
      setDisciplinas([...disciplinas, newDisciplina])
    }

    setIsDialogOpen(false)
    setEditingDisciplina(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      codigo: "",
      nome: "",
      curso: "",
      turmas: "",
      cargaHoraria: "",
      periodo: "2024/1",
      descricao: "",
      cor: "blue",
    })
  }

  const handleEdit = (disciplina: any) => {
    setEditingDisciplina(disciplina)
    setFormData({
      codigo: disciplina.codigo,
      nome: disciplina.nome,
      curso: disciplina.curso,
      turmas: disciplina.turmas.join(", "),
      cargaHoraria: disciplina.cargaHoraria.toString(),
      periodo: disciplina.periodo,
      descricao: disciplina.descricao,
      cor: disciplina.cor,
    })
    setIsDialogOpen(true)
  }

  const handleViewAlunos = (disciplina: any) => {
    setSelectedDisciplina(disciplina)
    setViewMode("alunos")
  }

  const handleDelete = (id: number) => {
    setDisciplinas(disciplinas.filter((disciplina) => disciplina.id !== id))
  }

  const openNewDialog = () => {
    setEditingDisciplina(null)
    resetForm()
    setError("")
    setIsDialogOpen(true)
  }

  const getFrequenciaColor = (frequencia: number) => {
    if (frequencia >= 95) return "text-green-600"
    if (frequencia >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  const getMediaColor = (media: number) => {
    if (media >= 8.0) return "text-green-600"
    if (media >= 6.0) return "text-yellow-600"
    return "text-red-600"
  }

  if (viewMode === "alunos" && selectedDisciplina) {
    const alunosDisciplina = alunosPorDisciplina[selectedDisciplina.id as keyof typeof alunosPorDisciplina] || []

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex">
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
                        } else if (item.id === "professores") {
                          window.location.href = "/dashboard/professores"
                        }
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                          : "text-blue-100 hover:bg-blue-800/50 hover:text-white hover:transform hover:scale-105"
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

        {/* Área invisível para trigger da sidebar */}
        <div className="fixed left-0 top-0 w-5 h-full z-40 bg-transparent" onMouseEnter={() => setSidebarOpen(true)} />

        {/* Main Content - Alunos da Disciplina */}
        <div className="flex-1 w-full">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      {selectedDisciplina.nome}
                    </h1>
                    <p className="text-sm text-slate-600">
                      {selectedDisciplina.codigo} - {selectedDisciplina.curso}
                    </p>
                  </div>
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
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => (window.location.href = "/dashboard/configuracoes")}>
                      <Settings className="h-4 w-4 mr-2" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuItem>
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
            {/* Info da Disciplina */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total de Alunos</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        {alunosDisciplina.length}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-full">
                      <GraduationCap className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Carga Horária</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        {selectedDisciplina.cargaHoraria}h
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-slate-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Turmas</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        {selectedDisciplina.turmas.length}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-full">
                      <Users className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Período</p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        {selectedDisciplina.periodo}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-slate-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabela de Alunos */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-blue-100">
                <CardTitle className="text-slate-800">Alunos da Disciplina</CardTitle>
                <CardDescription className="text-slate-600">
                  Lista de alunos matriculados em {selectedDisciplina.nome}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border rounded-lg overflow-hidden shadow-sm bg-gradient-to-r from-slate-50 to-blue-50">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-blue-100 to-slate-100 border-b border-blue-200">
                        <TableHead className="text-slate-700 font-semibold">Aluno</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Matrícula</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Turma</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Média</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Frequência</TableHead>
                        <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alunosDisciplina.map((aluno) => (
                        <TableRow key={aluno.id} className="hover:bg-blue-50/50 transition-colors">
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
                                <div className="font-medium text-slate-800">{aluno.nome}</div>
                                <div className="text-sm text-gray-500">{aluno.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-slate-700">{aluno.matricula}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-blue-200 text-blue-700">
                              {aluno.turma}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className={`font-medium ${getMediaColor(aluno.notas.media)}`}>
                                {aluno.notas.media.toFixed(1)}
                              </span>
                              <span className="text-xs text-gray-500">
                                N1: {aluno.notas.n1} | N2: {aluno.notas.n2}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`font-medium ${getFrequenciaColor(aluno.frequencia)}`}>
                              {aluno.frequencia}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">{aluno.status}</Badge>
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex">
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
                      } else if (item.id === "professores") {
                        window.location.href = "/dashboard/professores"
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                        : "text-blue-100 hover:bg-blue-800/50 hover:text-white hover:transform hover:scale-105"
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
                  Disciplinas
                </h1>
                <p className="text-sm text-slate-600">Minhas Disciplinas - Prof. Maria Silva</p>
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
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => (window.location.href = "/dashboard/configuracoes")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total de Disciplinas</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      {disciplinas.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Alunos Total</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      {disciplinas.reduce((acc, disc) => acc + disc.totalAlunos, 0)}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-full">
                    <Users className="h-6 w-6 text-slate-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Carga Horária Total</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      {disciplinas.reduce((acc, disc) => acc + Number.parseInt(disc.cargaHoraria), 0)}h
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Período Atual</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      2024/1
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-slate-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Disciplinas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((disciplina) => (
              <Card
                key={disciplina.id}
                className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            coresDisciplina.find((c) => c.value === disciplina.cor)?.class ||
                            "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {disciplina.codigo}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-1">{disciplina.nome}</h3>
                      <p className="text-sm text-slate-600 mb-2">{disciplina.curso}</p>
                      <p className="text-xs text-slate-500">{disciplina.descricao}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{disciplina.totalAlunos}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{disciplina.cargaHoraria}h</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleViewAlunos(disciplina)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Alunos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
