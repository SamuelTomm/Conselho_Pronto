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
  UserCheck,
} from "lucide-react"
import { CourseDetailsDialog } from "@/components/course-details-dialog"

// Dados simulados dos cursos
const cursosData = [
  {
    id: 1,
    codigo: "BASICO",
    nome: "Formação Básica",
    descricao: "Disciplinas básicas obrigatórias para todos os alunos do Ensino Médio",
    tipo: "Básico",
    alunos: 450,
    disciplinas: 8,
    cor: "blue",
  },
  {
    id: 2,
    codigo: "EXATAS",
    nome: "Itinerário de Exatas",
    descricao: "Aprofundamento em Matemática, Física, Química e áreas correlatas",
    tipo: "Itinerário",
    alunos: 120,
    disciplinas: 6,
    cor: "green",
  },
  {
    id: 3,
    codigo: "HUMANAS",
    nome: "Itinerário de Humanas",
    descricao: "Aprofundamento em História, Geografia, Sociologia e Filosofia",
    tipo: "Itinerário",
    alunos: 95,
    disciplinas: 5,
    cor: "purple",
  },
  {
    id: 4,
    codigo: "TEC_TI",
    nome: "Técnico em Informática",
    descricao: "Curso técnico em Tecnologia da Informação e Programação",
    tipo: "Técnico",
    alunos: 85,
    disciplinas: 12,
    cor: "orange",
  },
  {
    id: 5,
    codigo: "TEC_DESIGN",
    nome: "Técnico em Design",
    descricao: "Curso técnico em Design Gráfico e Comunicação Visual",
    tipo: "Técnico",
    alunos: 65,
    disciplinas: 10,
    cor: "pink",
  },
  {
    id: 6,
    codigo: "TEC_AGRO",
    nome: "Técnico em Agropecuária",
    descricao: "Curso técnico em Agropecuária e Desenvolvimento Rural",
    tipo: "Técnico",
    alunos: 75,
    disciplinas: 11,
    cor: "emerald",
  },
]

const menuItems = [
  { id: "inicio", label: "Início", icon: Home, active: false },
  { id: "ciclos", label: "Ciclos", icon: Circle, active: false },
  { id: "cursos", label: "Cursos", icon: FileText, active: true },
  { id: "alunos", label: "Alunos", icon: Users, active: false },
  { id: "disciplinas", label: "Disciplinas", icon: BookOpen, active: false },
  { id: "turmas", label: "Turmas", icon: Send, active: false },
  { id: "professores", label: "Professores", icon: UserCheck, active: false },
]

const tiposCurso = [
  { value: "Básico", label: "Básico" },
  { value: "Itinerário", label: "Itinerário" },
  { value: "Técnico", label: "Técnico" },
]

const coresCurso = [
  { value: "blue", label: "Azul", class: "bg-blue-100 text-blue-800" },
  { value: "green", label: "Verde", class: "bg-green-100 text-green-800" },
  { value: "purple", label: "Roxo", class: "bg-purple-100 text-purple-800" },
  { value: "orange", label: "Laranja", class: "bg-orange-100 text-orange-800" },
  { value: "pink", label: "Rosa", class: "bg-pink-100 text-pink-800" },
  { value: "emerald", label: "Esmeralda", class: "bg-emerald-100 text-emerald-800" },
]

export default function CursosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMenuItem, setActiveMenuItem] = useState("cursos")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    // Limpar dados de sessão (se houver)
    localStorage.removeItem("user")
    sessionStorage.clear()
    
    // Redirecionar para a página de login
    window.location.href = "/"
  }
  const [cursos, setCursos] = useState(cursosData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCourseDetailsDialogOpen, setIsCourseDetailsDialogOpen] = useState(false) // Renamed
  const [editingCurso, setEditingCurso] = useState<any>(null)
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<any>(null) // Renamed
  const [formData, setFormData] = useState({ codigo: "", nome: "", descricao: "", tipo: "", cor: "blue" })
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

  const filteredData = cursos.filter(
    (curso) =>
      curso.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredData.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const paginatedData = filteredData.slice(startIndex, startIndex + Number.parseInt(itemsPerPage))

  const getCorClass = (cor: string) => {
    const corObj = coresCurso.find((c) => c.value === cor)
    return corObj ? corObj.class : "bg-gray-100 text-gray-800"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.codigo || !formData.nome || !formData.tipo) {
      setError("Código, nome e tipo são obrigatórios")
      return
    }

    if (editingCurso) {
      // Editar curso existente
      setCursos(
        cursos.map((curso) =>
          curso.id === editingCurso.id
            ? {
                ...curso,
                codigo: formData.codigo,
                nome: formData.nome,
                descricao: formData.descricao,
                tipo: formData.tipo,
                cor: formData.cor,
              }
            : curso,
        ),
      )
    } else {
      // Adicionar novo curso
      const newCurso = {
        id: Math.max(...cursos.map((c) => c.id)) + 1,
        codigo: formData.codigo,
        nome: formData.nome,
        descricao: formData.descricao,
        tipo: formData.tipo,
        cor: formData.cor,
        alunos: 0,
        disciplinas: 0,
      }
      setCursos([...cursos, newCurso])
    }

    setIsDialogOpen(false)
    setEditingCurso(null)
    setFormData({ codigo: "", nome: "", descricao: "", tipo: "", cor: "blue" })
  }

  const handleEdit = (curso: any) => {
    setEditingCurso(curso)
    setFormData({
      codigo: curso.codigo,
      nome: curso.nome,
      descricao: curso.descricao,
      tipo: curso.tipo,
      cor: curso.cor,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setCursos(cursos.filter((curso) => curso.id !== id))
  }

  const handleViewCourseDetails = (curso: any) => {
    // Renamed function
    setSelectedCourseForDetails(curso)
    setIsCourseDetailsDialogOpen(true)
  }

  const openNewDialog = () => {
    setEditingCurso(null)
    setFormData({ codigo: "", nome: "", descricao: "", tipo: "", cor: "blue" })
    setError("")
    setIsDialogOpen(true)
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
                  Cursos
                </h1>
                <p className="text-sm text-slate-600">Gestão de Cursos do Ensino Médio</p>
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
                  <CardTitle className="text-slate-800">Gestão de Cursos</CardTitle>
                  <CardDescription className="text-slate-600">
                    Gerencie os cursos do Ensino Médio: Básico, Itinerários e Técnicos
                  </CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={openNewDialog}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Incluir Novo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-blue-50/30">
                    <DialogHeader>
                      <DialogTitle className="text-slate-800">
                        {editingCurso ? "Editar Curso" : "Novo Curso"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingCurso ? "Edite as informações do curso." : "Adicione um novo curso ao sistema."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="codigo" className="text-right text-slate-700">
                            Código
                          </Label>
                          <Input
                            id="codigo"
                            value={formData.codigo}
                            onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                            className="col-span-3 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                            placeholder="Ex: TEC_TI"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="nome" className="text-right text-slate-700">
                            Nome
                          </Label>
                          <Input
                            id="nome"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            className="col-span-3 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                            placeholder="Ex: Técnico em Informática"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tipo" className="text-right text-slate-700">
                            Tipo
                          </Label>
                          <Select
                            value={formData.tipo}
                            onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                          >
                            <SelectTrigger className="col-span-3 border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              {tiposCurso.map((tipo) => (
                                <SelectItem key={tipo.value} value={tipo.value}>
                                  {tipo.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="cor" className="text-right text-slate-700">
                            Cor
                          </Label>
                          <Select
                            value={formData.cor}
                            onValueChange={(value) => setFormData({ ...formData, cor: value })}
                          >
                            <SelectTrigger className="col-span-3 border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {coresCurso.map((cor) => (
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
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="descricao" className="text-right mt-2 text-slate-700">
                            Descrição
                          </Label>
                          <Textarea
                            id="descricao"
                            value={formData.descricao}
                            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                            className="col-span-3 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                            placeholder="Descrição do curso..."
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
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        >
                          {editingCurso ? "Salvar" : "Adicionar"}
                        </Button>
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
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Show</span>
                    <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                      <SelectTrigger className="w-20 border-blue-200 focus:border-blue-400">
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
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="border rounded-lg overflow-hidden shadow-sm bg-gradient-to-r from-slate-50 to-blue-50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-100 to-slate-100 border-b border-blue-200">
                      <TableHead className="text-slate-700 font-semibold">Código</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Nome do Curso</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Tipo</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Alunos</TableHead>
                      <TableHead className="text-slate-700 font-semibold">Disciplinas</TableHead>
                      <TableHead className="w-20 text-center text-slate-700 font-semibold">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((curso) => (
                      <TableRow key={curso.id} className="hover:bg-blue-50/50 transition-colors">
                        <TableCell className="font-medium text-slate-700">{curso.codigo}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-800">{curso.nome}</span>
                            {curso.descricao && <span className="text-sm text-gray-500">{curso.descricao}</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCorClass(curso.cor)}>{curso.tipo}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <GraduationCap className="h-4 w-4 text-blue-500" />
                            <span className="text-slate-700">{curso.alunos}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4 text-blue-500" />
                            <span className="text-slate-700">{curso.disciplinas}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                                <MoreHorizontal className="h-4 w-4 text-blue-600" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
                              <DropdownMenuItem
                                onClick={() => handleViewCourseDetails(curso)}
                                className="hover:bg-blue-50"
                              >
                                <Eye className="h-4 w-4 mr-2 text-blue-600" />
                                Visualizar Detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(curso)} className="hover:bg-blue-50">
                                <Edit className="h-4 w-4 mr-2 text-blue-600" />
                                Alterar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => handleDelete(curso.id)}
                              >
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
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium text-slate-700">
                    {currentPage} / {totalPages}
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

      {/* Dialog para visualizar detalhes do curso */}
      {selectedCourseForDetails && (
        <CourseDetailsDialog
          open={isCourseDetailsDialogOpen}
          onOpenChange={setIsCourseDetailsDialogOpen}
          course={selectedCourseForDetails}
        />
      )}
    </div>
  )
}
