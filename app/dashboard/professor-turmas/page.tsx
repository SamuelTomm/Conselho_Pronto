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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

// Dados simulados do professor logado
const professorLogado = {
  id: 1,
  nome: "Prof. Maria Silva",
  email: "maria.silva@ivoti.edu.br",
  disciplinas: ["Matemática", "Física"],
  turmas: ["3º A", "1º B"],
  permissoes: {
    visualizarAlunos: true,
    editarAlunos: false,
    visualizarNotas: true,
    editarNotas: true,
    visualizarFaltas: true,
    editarFaltas: true,
    gerarRelatorios: true,
  },
}

// Dados simulados das turmas do professor
const turmasProfessor = [
  {
    id: 1,
    nome: "3º A",
    curso: "Formação Básica",
    disciplina: "Matemática",
    alunos: [
      {
        id: 1,
        matricula: "2024001",
        nome: "Ana Silva Santos",
        email: "ana.santos@estudante.ivoti.edu.br",
        foto: "/placeholder.svg?height=40&width=40&text=AS",
        notas: {
          n1: 8.5,
          n2: 7.8,
          n3: 8.2,
          n4: null,
          recuperacao: null,
          media: 8.17,
        },
        faltas: 3,
        faltasJustificadas: 2,
        observacoes: "Aluna dedicada, participa ativamente das aulas.",
        statusAvaliacao: "pendente", // pendente, aprovado, reprovado
      },
      {
        id: 2,
        matricula: "2024002",
        nome: "Bruno Costa Lima",
        email: "bruno.lima@estudante.ivoti.edu.br",
        foto: "/placeholder.svg?height=40&width=40&text=BL",
        notas: {
          n1: 9.2,
          n2: 8.7,
          n3: 9.0,
          n4: null,
          recuperacao: null,
          media: 8.97,
        },
        faltas: 1,
        faltasJustificadas: 1,
        observacoes: "Excelente em matemática e física.",
        statusAvaliacao: "aprovado",
      },
    ],
  },
  {
    id: 2,
    nome: "1º B",
    curso: "Itinerário de Exatas",
    disciplina: "Física",
    alunos: [
      {
        id: 3,
        matricula: "2024003",
        nome: "Carla Oliveira Mendes",
        email: "carla.mendes@estudante.ivoti.edu.br",
        foto: "/placeholder.svg?height=40&width=40&text=CM",
        notas: {
          n1: 7.5,
          n2: 8.0,
          n3: 7.8,
          n4: null,
          recuperacao: null,
          media: 7.77,
        },
        faltas: 2,
        faltasJustificadas: 1,
        observacoes: "Muito criativa, destaque em projetos visuais.",
        statusAvaliacao: "pendente",
      },
    ],
  },
]

const menuItems = [
  { id: "inicio", label: "Início", icon: Home, active: false },
  { id: "minhas-turmas", label: "Minhas Turmas", icon: Users, active: true },
  { id: "avaliacoes", label: "Avaliações", icon: FileBarChart, active: false },
  { id: "relatorios", label: "Relatórios", icon: FileText, active: false },
]

export default function ProfessorTurmasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTurma, setSelectedTurma] = useState<any>(null)
  const [isAvaliacaoDialogOpen, setIsAvaliacaoDialogOpen] = useState(false)
  const [selectedAluno, setSelectedAluno] = useState<any>(null)
  const [avaliacaoData, setAvaliacaoData] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    recuperacao: "",
    observacoes: "",
    recomendacao: "aprovado", // aprovado, reprovado, recuperacao
  })
  const [error, setError] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("user")
    sessionStorage.clear()
    window.location.href = "/"
  }

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

  const handleAvaliarAluno = (aluno: any) => {
    setSelectedAluno(aluno)
    setAvaliacaoData({
      n1: aluno.notas.n1?.toString() || "",
      n2: aluno.notas.n2?.toString() || "",
      n3: aluno.notas.n3?.toString() || "",
      n4: aluno.notas.n4?.toString() || "",
      recuperacao: aluno.notas.recuperacao?.toString() || "",
      observacoes: aluno.observacoes || "",
      recomendacao: aluno.statusAvaliacao === "aprovado" ? "aprovado" : 
                   aluno.statusAvaliacao === "reprovado" ? "reprovado" : "recuperacao",
    })
    setIsAvaliacaoDialogOpen(true)
  }

  const handleSalvarAvaliacao = () => {
    if (!avaliacaoData.n1 || !avaliacaoData.n2 || !avaliacaoData.n3) {
      setError("N1, N2 e N3 são obrigatórios")
      return
    }

    // Aqui você salvaria a avaliação no backend
    console.log("Salvando avaliação:", {
      aluno: selectedAluno,
      avaliacao: avaliacaoData,
    })

    setIsAvaliacaoDialogOpen(false)
    setError("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aprovado":
        return "bg-green-100 text-green-800"
      case "reprovado":
        return "bg-red-100 text-red-800"
      case "recuperacao":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle className="h-4 w-4" />
      case "reprovado":
        return <AlertCircle className="h-4 w-4" />
      case "recuperacao":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getMediaColor = (media: number) => {
    if (media >= 7.0) return "text-green-600"
    if (media >= 6.0) return "text-yellow-600"
    return "text-red-600"
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
              <p className="text-blue-200 text-xs">Professor</p>
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
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
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

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full text-blue-100 hover:bg-blue-800/50 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Área invisível para trigger da sidebar */}
      <div className="fixed left-0 top-0 w-5 h-full z-40 bg-transparent" onMouseEnter={() => setSidebarOpen(true)} />

      {/* Main Content */}
      <div className="flex-1 ml-0 lg:ml-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Minhas Turmas
                </h1>
                <p className="text-sm text-slate-600">
                  {professorLogado.nome} - {professorLogado.disciplinas.join(", ")}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={professorLogado.nome} />
                      <AvatarFallback>
                        {professorLogado.nome.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-slate-700">{professorLogado.nome}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
          {/* Seleção de Turma */}
          <Card className="mb-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Selecione uma Turma</CardTitle>
              <CardDescription>Escolha a turma para visualizar e avaliar os alunos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {turmasProfessor.map((turma) => (
                  <Card
                    key={turma.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedTurma?.id === turma.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedTurma(turma)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{turma.nome}</h3>
                        <Badge variant="outline">{turma.disciplina}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{turma.curso}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{turma.alunos.length} alunos</span>
                        <Badge variant="secondary" className="text-xs">
                          {turma.alunos.filter(a => a.statusAvaliacao === "pendente").length} pendentes
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lista de Alunos da Turma Selecionada */}
          {selectedTurma && (
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-800">
                      Alunos - {selectedTurma.nome} ({selectedTurma.disciplina})
                    </CardTitle>
                    <CardDescription>
                      Avalie os alunos para o pré-conselho e conselho de classe
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {selectedTurma.alunos.filter(a => a.statusAvaliacao === "aprovado").length} Aprovados
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {selectedTurma.alunos.filter(a => a.statusAvaliacao === "recuperacao").length} Recuperação
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {selectedTurma.alunos.filter(a => a.statusAvaliacao === "reprovado").length} Reprovados
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filtros */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar aluno..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>

                {/* Tabela de Alunos */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-blue-50 to-slate-50">
                        <TableHead>Aluno</TableHead>
                        <TableHead>Matrícula</TableHead>
                        <TableHead>Notas</TableHead>
                        <TableHead>Média</TableHead>
                        <TableHead>Faltas</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-20">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTurma.alunos
                        .filter((aluno) =>
                          aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          aluno.matricula.includes(searchTerm)
                        )
                        .map((aluno) => (
                          <TableRow key={aluno.id} className="hover:bg-blue-50/50">
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={aluno.foto} alt={aluno.nome} />
                                  <AvatarFallback>
                                    {aluno.nome.split(" ").map((n) => n[0]).join("").toUpperCase()}
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
                              <div className="text-sm">
                                <div>N1: {aluno.notas.n1?.toFixed(1) || "-"}</div>
                                <div>N2: {aluno.notas.n2?.toFixed(1) || "-"}</div>
                                <div>N3: {aluno.notas.n3?.toFixed(1) || "-"}</div>
                                <div>N4: {aluno.notas.n4?.toFixed(1) || "-"}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`font-bold ${getMediaColor(aluno.notas.media)}`}>
                                {aluno.notas.media.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>Total: {aluno.faltas}</div>
                                <div className="text-green-600">Justificadas: {aluno.faltasJustificadas}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(aluno.statusAvaliacao)}>
                                <div className="flex items-center space-x-1">
                                  {getStatusIcon(aluno.statusAvaliacao)}
                                  <span className="capitalize">{aluno.statusAvaliacao}</span>
                                </div>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4 text-blue-600" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleAvaliarAluno(aluno)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Avaliar Aluno
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
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {/* Dialog de Avaliação */}
      <Dialog open={isAvaliacaoDialogOpen} onOpenChange={setIsAvaliacaoDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Avaliar Aluno - {selectedAluno?.nome}</DialogTitle>
            <DialogDescription>
              Matrícula: {selectedAluno?.matricula} | Turma: {selectedTurma?.nome} | Disciplina: {selectedTurma?.disciplina}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleSalvarAvaliacao(); }}>
            <div className="space-y-6">
              {/* Notas */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="n1">Nota 1</Label>
                    <Input
                      id="n1"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={avaliacaoData.n1}
                      onChange={(e) => setAvaliacaoData({...avaliacaoData, n1: e.target.value})}
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="n2">Nota 2</Label>
                    <Input
                      id="n2"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={avaliacaoData.n2}
                      onChange={(e) => setAvaliacaoData({...avaliacaoData, n2: e.target.value})}
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="n3">Nota 3</Label>
                    <Input
                      id="n3"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={avaliacaoData.n3}
                      onChange={(e) => setAvaliacaoData({...avaliacaoData, n3: e.target.value})}
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="n4">Nota 4</Label>
                    <Input
                      id="n4"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={avaliacaoData.n4}
                      onChange={(e) => setAvaliacaoData({...avaliacaoData, n4: e.target.value})}
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="recuperacao">Recuperação</Label>
                  <Input
                    id="recuperacao"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={avaliacaoData.recuperacao}
                    onChange={(e) => setAvaliacaoData({...avaliacaoData, recuperacao: e.target.value})}
                    placeholder="0.0"
                  />
                </div>
              </div>

              {/* Recomendação */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recomendação para Conselho</h3>
                <Select value={avaliacaoData.recomendacao} onValueChange={(value) => setAvaliacaoData({...avaliacaoData, recomendacao: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a recomendação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aprovado">Aprovado</SelectItem>
                    <SelectItem value="recuperacao">Recuperação</SelectItem>
                    <SelectItem value="reprovado">Reprovado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Observações */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Observações</h3>
                <Textarea
                  value={avaliacaoData.observacoes}
                  onChange={(e) => setAvaliacaoData({...avaliacaoData, observacoes: e.target.value})}
                  placeholder="Observações sobre o desempenho do aluno..."
                  rows={4}
                />
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsAvaliacaoDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Salvar Avaliação
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
