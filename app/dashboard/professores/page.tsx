"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
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
  UserCheck,
  UserX,
  X,
} from "lucide-react"

// Dados simulados
const professoresData = [
  {
    id: 1,
    nome: "Prof. Maria Silva",
    email: "maria.silva@escola.com",
    telefone: "(11) 99999-9999",
    disciplinas: ["Matemática", "Física"],
    turmas: ["9º A", "1º B"],
    permissoes: {
      visualizarAlunos: true,
      editarAlunos: false,
      visualizarNotas: true,
      editarNotas: true,
      visualizarFaltas: true,
      editarFaltas: true,
      gerarRelatorios: true,
    },
    status: "ativo",
  },
  {
    id: 2,
    nome: "Prof. João Santos",
    email: "joao.santos@escola.com",
    telefone: "(11) 88888-8888",
    disciplinas: ["História", "Geografia"],
    turmas: ["2º A", "3º B"],
    permissoes: {
      visualizarAlunos: true,
      editarAlunos: true,
      visualizarNotas: true,
      editarNotas: true,
      visualizarFaltas: true,
      editarFaltas: false,
      gerarRelatorios: false,
    },
    status: "ativo",
  },
  {
    id: 3,
    nome: "Prof. Ana Costa",
    email: "ana.costa@escola.com",
    telefone: "(11) 77777-7777",
    disciplinas: ["Português", "Literatura"],
    turmas: ["1º A", "2º B"],
    permissoes: {
      visualizarAlunos: true,
      editarAlunos: false,
      visualizarNotas: true,
      editarNotas: true,
      visualizarFaltas: true,
      editarFaltas: true,
      gerarRelatorios: true,
    },
    status: "inativo",
  },
]

const disciplinasDisponiveis = [
  "Matemática",
  "Português",
  "História",
  "Geografia",
  "Ciências",
  "Física",
  "Química",
  "Biologia",
  "Inglês",
  "Educação Física",
  "Artes",
  "Filosofia",
]

const turmasDisponiveis = ["1º A", "1º B", "2º A", "2º B", "3º A", "3º B", "6º A", "7º A", "8º A", "9º A", "9º B"]

const menuItems = [
  { id: "inicio", label: "Início", icon: Home, active: false },
  { id: "ciclos", label: "Anos Letivos", icon: Circle, active: false },
  { id: "cursos", label: "Cursos", icon: FileText, active: false },
  { id: "alunos", label: "Alunos", icon: Users, active: false },
  { id: "disciplinas", label: "Disciplinas", icon: BookOpen, active: false },
  { id: "turmas", label: "Turmas", icon: Send, active: false },
  { id: "professores", label: "Professores", icon: UserCheck, active: true },
]

export default function ProfessoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMenuItem, setActiveMenuItem] = useState("professores")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    // Limpar dados de sessão (se houver)
    localStorage.removeItem("user")
    sessionStorage.clear()
    
    // Redirecionar para a página de login
    window.location.href = "/"
  }
  const [professores, setProfessores] = useState(professoresData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPermissoesDialogOpen, setIsPermissoesDialogOpen] = useState(false)
  const [editingProfessor, setEditingProfessor] = useState<any>(null)
  const [professorPermissoes, setProfessorPermissoes] = useState<any>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    disciplinas: [] as string[],
    turmas: [] as string[],
    permissoes: {
      visualizarAlunos: true,
      editarAlunos: false,
      visualizarNotas: true,
      editarNotas: false,
      visualizarFaltas: true,
      editarFaltas: false,
      gerarRelatorios: false,
    },
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

  const filteredData = professores.filter(
    (professor) =>
      professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.disciplinas.some((d) => d.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredData.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const paginatedData = filteredData.slice(startIndex, startIndex + Number.parseInt(itemsPerPage))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.nome || !formData.email) {
      setError("Nome e email são obrigatórios.")
      return
    }

    if (editingProfessor) {
      // Editar professor existente
      setProfessores(
        professores.map((prof) =>
          prof.id === editingProfessor.id ? { ...prof, ...formData, status: prof.status } : prof,
        ),
      )
    } else {
      // Adicionar novo professor
      const newProfessor = {
        id: Math.max(...professores.map((p) => p.id)) + 1,
        ...formData,
        status: "ativo",
      }
      setProfessores([...professores, newProfessor])
    }

    setIsDialogOpen(false)
    setEditingProfessor(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      disciplinas: [],
      turmas: [],
      permissoes: {
        visualizarAlunos: true,
        editarAlunos: false,
        visualizarNotas: true,
        editarNotas: false,
        visualizarFaltas: true,
        editarFaltas: false,
        gerarRelatorios: false,
      },
    })
  }

  const handleEdit = (professor: any) => {
    setEditingProfessor(professor)
    setFormData({
      nome: professor.nome,
      email: professor.email,
      telefone: professor.telefone || "",
      disciplinas: professor.disciplinas,
      turmas: professor.turmas,
      permissoes: professor.permissoes,
    })
    setIsDialogOpen(true)
  }

  const handleToggleStatus = (id: number) => {
    setProfessores(
      professores.map((prof) =>
        prof.id === id ? { ...prof, status: prof.status === "ativo" ? "inativo" : "ativo" } : prof,
      ),
    )
  }

  const handleDelete = (id: number) => {
    setProfessores(professores.filter((prof) => prof.id !== id))
  }

  const openNewDialog = () => {
    setEditingProfessor(null)
    resetForm()
    setError("")
    setIsDialogOpen(true)
  }

  const handleGerenciarPermissoes = (professor: any) => {
    setProfessorPermissoes(professor)
    setIsPermissoesDialogOpen(true)
  }

  const handleDisciplinaChange = (disciplina: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        disciplinas: [...formData.disciplinas, disciplina],
      })
    } else {
      setFormData({
        ...formData,
        disciplinas: formData.disciplinas.filter((d) => d !== disciplina),
      })
    }
  }

  const handleTurmaChange = (turma: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        turmas: [...formData.turmas, turma],
      })
    } else {
      setFormData({
        ...formData,
        turmas: formData.turmas.filter((t) => t !== turma),
      })
    }
  }

  const handlePermissaoChange = (permissao: string, checked: boolean) => {
    setFormData({
      ...formData,
      permissoes: {
        ...formData.permissoes,
        [permissao]: checked,
      },
    })
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
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-blue-800/50"
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

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
                  Professores
                </h1>
                <p className="text-sm text-slate-600">Gerencie professores, permissões e atribuições</p>
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
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-800">Gestão de Professores</CardTitle>
                  <CardDescription className="text-slate-600">
                    Cadastre professores e defina suas permissões e atribuições
                  </CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <Button
                    onClick={openNewDialog}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Professor
                  </Button>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingProfessor ? "Editar Professor" : "Novo Professor"}</DialogTitle>
                      <DialogDescription>
                        {editingProfessor
                          ? "Edite as informações do professor."
                          : "Cadastre um novo professor no sistema."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-6 py-4">
                        {/* Dados Pessoais */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium text-gray-900">Dados Pessoais</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="nome">Nome *</Label>
                              <Input
                                id="nome"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                placeholder="Nome completo"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email@escola.com"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input
                              id="telefone"
                              value={formData.telefone}
                              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                              placeholder="(11) 99999-9999"
                            />
                          </div>
                        </div>

                        {/* Disciplinas */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium text-gray-900">Disciplinas</h3>
                          <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border rounded p-3">
                            {disciplinasDisponiveis.map((disciplina) => (
                              <div key={disciplina} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`disciplina-${disciplina}`}
                                  checked={formData.disciplinas.includes(disciplina)}
                                  onCheckedChange={(checked) => handleDisciplinaChange(disciplina, checked as boolean)}
                                />
                                <Label htmlFor={`disciplina-${disciplina}`} className="text-xs">
                                  {disciplina}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Turmas */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium text-gray-900">Turmas</h3>
                          <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto border rounded p-3">
                            {turmasDisponiveis.map((turma) => (
                              <div key={turma} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`turma-${turma}`}
                                  checked={formData.turmas.includes(turma)}
                                  onCheckedChange={(checked) => handleTurmaChange(turma, checked as boolean)}
                                />
                                <Label htmlFor={`turma-${turma}`} className="text-xs">
                                  {turma}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Permissões */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium text-gray-900">Permissões</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries({
                              visualizarAlunos: "Visualizar Alunos",
                              editarAlunos: "Editar Alunos",
                              visualizarNotas: "Visualizar Notas",
                              editarNotas: "Editar Notas",
                              visualizarFaltas: "Visualizar Faltas",
                              editarFaltas: "Editar Faltas",
                              gerarRelatorios: "Gerar Relatórios",
                            }).map(([key, label]) => (
                              <div key={key} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`permissao-${key}`}
                                  checked={formData.permissoes[key as keyof typeof formData.permissoes]}
                                  onCheckedChange={(checked) => handlePermissaoChange(key, checked as boolean)}
                                />
                                <Label htmlFor={`permissao-${key}`} className="text-sm">
                                  {label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {error && (
                        <Alert variant="destructive" className="mb-4">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <DialogFooter>
                        <Button type="submit">{editingProfessor ? "Salvar" : "Cadastrar"}</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Filters */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Pesquisar professores..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 por página</SelectItem>
                      <SelectItem value="10">10 por página</SelectItem>
                      <SelectItem value="20">20 por página</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Table */}
              <div className="border rounded-lg overflow-hidden shadow-sm bg-gradient-to-r from-slate-50 to-blue-50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-100 to-slate-100 border-b border-blue-200">
                      <TableHead className="text-slate-700 font-semibold">Professor</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Disciplinas</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Turmas</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((professor) => (
                      <TableRow key={professor.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell>
                          <div>
                            <div className="font-medium text-slate-800">{professor.nome}</div>
                            <div className="text-sm text-gray-500">{professor.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {professor.disciplinas.slice(0, 2).map((disciplina) => (
                              <Badge
                                key={disciplina}
                                variant="outline"
                                className="text-xs border-blue-200 text-blue-700"
                              >
                                {disciplina}
                              </Badge>
                            ))}
                            {professor.disciplinas.length > 2 && (
                              <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                                +{professor.disciplinas.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {professor.turmas.slice(0, 2).map((turma) => (
                              <Badge key={turma} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                                {turma}
                              </Badge>
                            ))}
                            {professor.turmas.length > 2 && (
                              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                                +{professor.turmas.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={professor.status === "ativo" ? "default" : "secondary"}
                            className={
                              professor.status === "ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {professor.status === "ativo" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                                <MoreHorizontal className="h-4 w-4 text-blue-600" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(professor)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleGerenciarPermissoes(professor)}>
                                <Settings className="h-4 w-4 mr-2" />
                                Gerenciar Permissões
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(professor.id)}>
                                {professor.status === "ativo" ? (
                                  <>
                                    <UserX className="h-4 w-4 mr-2" />
                                    Desativar
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Ativar
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(professor.id)}>
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
                  Mostrando {startIndex + 1} a{" "}
                  {Math.min(startIndex + Number.parseInt(itemsPerPage), filteredData.length)} de {filteredData.length}{" "}
                  registros
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium text-slate-700">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Dialog de Gerenciamento de Permissões */}
      <Dialog open={isPermissoesDialogOpen} onOpenChange={setIsPermissoesDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gerenciar Permissões - {professorPermissoes?.nome}</DialogTitle>
            <DialogDescription>
              Configure as permissões, disciplinas e turmas atribuídas ao professor
            </DialogDescription>
          </DialogHeader>
          {professorPermissoes && (
            <div className="space-y-6">
              {/* Informações do Professor */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Informações do Professor</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Nome:</span> {professorPermissoes.nome}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {professorPermissoes.email}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <Badge className={professorPermissoes.status === "ativo" ? "bg-green-100 text-green-800 ml-2" : "bg-red-100 text-red-800 ml-2"}>
                      {professorPermissoes.status === "ativo" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Disciplinas Atribuídas */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Disciplinas Atribuídas</h3>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border rounded p-3">
                  {disciplinasDisponiveis.map((disciplina) => (
                    <div key={disciplina} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`perm-disciplina-${disciplina}`}
                        checked={professorPermissoes.disciplinas.includes(disciplina)}
                        onChange={(e) => {
                          const updatedProfessor = { ...professorPermissoes }
                          if (e.target.checked) {
                            updatedProfessor.disciplinas = [...updatedProfessor.disciplinas, disciplina]
                          } else {
                            updatedProfessor.disciplinas = updatedProfessor.disciplinas.filter((d: string) => d !== disciplina)
                          }
                          setProfessorPermissoes(updatedProfessor)
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={`perm-disciplina-${disciplina}`} className="text-sm">
                        {disciplina}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turmas Atribuídas */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Turmas Atribuídas</h3>
                <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto border rounded p-3">
                  {turmasDisponiveis.map((turma) => (
                    <div key={turma} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`perm-turma-${turma}`}
                        checked={professorPermissoes.turmas.includes(turma)}
                        onChange={(e) => {
                          const updatedProfessor = { ...professorPermissoes }
                          if (e.target.checked) {
                            updatedProfessor.turmas = [...updatedProfessor.turmas, turma]
                          } else {
                            updatedProfessor.turmas = updatedProfessor.turmas.filter((t: string) => t !== turma)
                          }
                          setProfessorPermissoes(updatedProfessor)
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={`perm-turma-${turma}`} className="text-sm">
                        {turma}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Permissões do Sistema */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Permissões do Sistema</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries({
                    visualizarAlunos: "Visualizar Alunos",
                    editarAlunos: "Editar Alunos",
                    visualizarNotas: "Visualizar Notas",
                    editarNotas: "Editar Notas",
                    visualizarFaltas: "Visualizar Faltas",
                    editarFaltas: "Editar Faltas",
                    gerarRelatorios: "Gerar Relatórios",
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`perm-${key}`}
                        checked={professorPermissoes.permissoes[key as keyof typeof professorPermissoes.permissoes]}
                        onChange={(e) => {
                          const updatedProfessor = { ...professorPermissoes }
                          updatedProfessor.permissoes[key as keyof typeof professorPermissoes.permissoes] = e.target.checked
                          setProfessorPermissoes(updatedProfessor)
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={`perm-${key}`} className="text-sm">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumo de Atribuições */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Resumo de Atribuições</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Disciplinas:</span> {professorPermissoes.disciplinas.length}
                  </div>
                  <div>
                    <span className="font-medium">Turmas:</span> {professorPermissoes.turmas.length}
                  </div>
                  <div>
                    <span className="font-medium">Permissões Ativas:</span> {Object.values(professorPermissoes.permissoes).filter(Boolean).length}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsPermissoesDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={() => {
                // Atualizar o professor com as novas permissões
                setProfessores(professores.map((prof) => 
                  prof.id === professorPermissoes.id ? professorPermissoes : prof
                ))
                setIsPermissoesDialogOpen(false)
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Salvar Permissões
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
