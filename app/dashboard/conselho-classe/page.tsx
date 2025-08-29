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
  Search,
  Filter,
  Download,
  Printer,
} from "lucide-react"

// Dados simulados do conselho de classe
const conselhoData = {
  turma: "3º A",
  curso: "Formação Básica",
  periodo: "2024/1",
  dataConselho: "2024-06-15",
  status: "em_andamento", // agendado, em_andamento, finalizado
  alunos: [
    {
      id: 1,
      matricula: "2024001",
      nome: "Ana Silva Santos",
      foto: "/placeholder.svg?height=40&width=40&text=AS",
      disciplinas: [
        {
          nome: "Matemática",
          professor: "Prof. Maria Silva",
          notas: { n1: 8.5, n2: 7.8, n3: 8.2, n4: null, media: 8.17 },
          faltas: 3,
          faltasJustificadas: 2,
          recomendacao: "aprovado",
          observacoes: "Aluna dedicada, participa ativamente das aulas.",
        },
        {
          nome: "Português",
          professor: "Prof. João Santos",
          notas: { n1: 9.0, n2: 8.5, n3: 8.8, n4: null, media: 8.77 },
          faltas: 1,
          faltasJustificadas: 1,
          recomendacao: "aprovado",
          observacoes: "Excelente redação e interpretação.",
        },
        {
          nome: "História",
          professor: "Prof. Ana Costa",
          notas: { n1: 7.5, n2: 8.0, n3: 7.8, n4: null, media: 7.77 },
          faltas: 2,
          faltasJustificadas: 1,
          recomendacao: "aprovado",
          observacoes: "Participativo, mas precisa melhorar na escrita.",
        },
      ],
      mediaGeral: 8.24,
      totalFaltas: 6,
      faltasJustificadas: 4,
      decisaoFinal: "aprovado", // aprovado, reprovado, recuperacao
      observacoesGerais: "Aluna com bom desempenho geral, aprovada em todas as disciplinas.",
    },
    {
      id: 2,
      matricula: "2024002",
      nome: "Bruno Costa Lima",
      foto: "/placeholder.svg?height=40&width=40&text=BL",
      disciplinas: [
        {
          nome: "Matemática",
          professor: "Prof. Maria Silva",
          notas: { n1: 9.2, n2: 8.7, n3: 9.0, n4: null, media: 8.97 },
          faltas: 1,
          faltasJustificadas: 1,
          recomendacao: "aprovado",
          observacoes: "Destaque na turma, excelente em cálculos.",
        },
        {
          nome: "Física",
          professor: "Prof. Carlos Mendes",
          notas: { n1: 8.8, n2: 9.1, n3: 8.9, n4: null, media: 8.93 },
          faltas: 0,
          faltasJustificadas: 0,
          recomendacao: "aprovado",
          observacoes: "Muito bom em cálculos e experimentos.",
        },
      ],
      mediaGeral: 8.95,
      totalFaltas: 1,
      faltasJustificadas: 1,
      decisaoFinal: "aprovado",
      observacoesGerais: "Aluno excelente, destaque em exatas.",
    },
  ],
}

const menuItems = [
  { id: "inicio", label: "Início", icon: Home, active: false },
  { id: "conselho", label: "Conselho de Classe", icon: Users, active: true },
  { id: "relatorios", label: "Relatórios", icon: FileText, active: false },
]

export default function ConselhoClassePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAluno, setSelectedAluno] = useState<any>(null)
  const [isDetalhesDialogOpen, setIsDetalhesDialogOpen] = useState(false)
  const [isDecisaoDialogOpen, setIsDecisaoDialogOpen] = useState(false)
  const [decisaoData, setDecisaoData] = useState({
    decisao: "aprovado",
    observacoes: "",
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

  const handleVerDetalhes = (aluno: any) => {
    setSelectedAluno(aluno)
    setIsDetalhesDialogOpen(true)
  }

  const handleDefinirDecisao = (aluno: any) => {
    setSelectedAluno(aluno)
    setDecisaoData({
      decisao: aluno.decisaoFinal,
      observacoes: aluno.observacoesGerais || "",
    })
    setIsDecisaoDialogOpen(true)
  }

  const handleSalvarDecisao = () => {
    if (!decisaoData.decisao) {
      setError("Decisão é obrigatória")
      return
    }

    // Aqui você salvaria a decisão no backend
    console.log("Salvando decisão:", {
      aluno: selectedAluno,
      decisao: decisaoData,
    })

    setIsDecisaoDialogOpen(false)
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

  const filteredAlunos = conselhoData.alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.matricula.includes(searchTerm)
  )

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
              <p className="text-blue-200 text-xs">Conselho de Classe</p>
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
                  Conselho de Classe
                </h1>
                <p className="text-sm text-slate-600">
                  {conselhoData.turma} - {conselhoData.curso} - {conselhoData.periodo}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(conselhoData.status)}>
                  {conselhoData.status === "em_andamento" ? "Em Andamento" : 
                   conselhoData.status === "finalizado" ? "Finalizado" : "Agendado"}
                </Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Resumo do Conselho */}
          <Card className="mb-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-800">Resumo do Conselho</CardTitle>
              <CardDescription>Informações gerais sobre o conselho de classe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{conselhoData.alunos.length}</div>
                  <div className="text-sm text-blue-600">Total de Alunos</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {conselhoData.alunos.filter(a => a.decisaoFinal === "aprovado").length}
                  </div>
                  <div className="text-sm text-green-600">Aprovados</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {conselhoData.alunos.filter(a => a.decisaoFinal === "recuperacao").length}
                  </div>
                  <div className="text-sm text-yellow-600">Recuperação</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {conselhoData.alunos.filter(a => a.decisaoFinal === "reprovado").length}
                  </div>
                  <div className="text-sm text-red-600">Reprovados</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Alunos */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-slate-800">Alunos - {conselhoData.turma}</CardTitle>
                  <CardDescription>
                    Avaliações e decisões do conselho de classe
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
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
            </CardHeader>
            <CardContent>
              {/* Tabela de Alunos */}
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-slate-50">
                      <TableHead>Aluno</TableHead>
                      <TableHead>Matrícula</TableHead>
                      <TableHead>Média Geral</TableHead>
                      <TableHead>Faltas</TableHead>
                      <TableHead>Disciplinas</TableHead>
                      <TableHead>Decisão Final</TableHead>
                      <TableHead className="w-20">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlunos.map((aluno) => (
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
                              <div className="text-sm text-gray-500">{aluno.matricula}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{aluno.matricula}</TableCell>
                        <TableCell>
                          <span className={`font-bold ${getMediaColor(aluno.mediaGeral)}`}>
                            {aluno.mediaGeral.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Total: {aluno.totalFaltas}</div>
                            <div className="text-green-600">Justificadas: {aluno.faltasJustificadas}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {aluno.disciplinas.map((disciplina) => (
                              <Badge
                                key={disciplina.nome}
                                variant="outline"
                                className={`text-xs ${
                                  disciplina.recomendacao === "aprovado"
                                    ? "border-green-200 text-green-700"
                                    : disciplina.recomendacao === "recuperacao"
                                    ? "border-yellow-200 text-yellow-700"
                                    : "border-red-200 text-red-700"
                                }`}
                              >
                                {disciplina.nome}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(aluno.decisaoFinal)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(aluno.decisaoFinal)}
                              <span className="capitalize">{aluno.decisaoFinal}</span>
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
                              <DropdownMenuItem onClick={() => handleVerDetalhes(aluno)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDefinirDecisao(aluno)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Definir Decisão
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

      {/* Dialog de Detalhes do Aluno */}
      <Dialog open={isDetalhesDialogOpen} onOpenChange={setIsDetalhesDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Aluno - {selectedAluno?.nome}</DialogTitle>
            <DialogDescription>
              Matrícula: {selectedAluno?.matricula} | Média Geral: {selectedAluno?.mediaGeral.toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          {selectedAluno && (
            <div className="space-y-6">
              {/* Informações Gerais */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Informações Gerais</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Média Geral:</span> {selectedAluno.mediaGeral.toFixed(2)}
                  </div>
                  <div>
                    <span className="font-medium">Total de Faltas:</span> {selectedAluno.totalFaltas}
                  </div>
                  <div>
                    <span className="font-medium">Faltas Justificadas:</span> {selectedAluno.faltasJustificadas}
                  </div>
                  <div>
                    <span className="font-medium">Decisão Final:</span>
                    <Badge className={`ml-2 ${getStatusColor(selectedAluno.decisaoFinal)}`}>
                      {selectedAluno.decisaoFinal}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Disciplinas */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Avaliações por Disciplina</h3>
                <div className="space-y-4">
                  {selectedAluno.disciplinas.map((disciplina, index) => (
                    <Card key={index} className="border-l-4 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{disciplina.nome}</h4>
                            <p className="text-sm text-gray-600">{disciplina.professor}</p>
                          </div>
                          <Badge className={getStatusColor(disciplina.recomendacao)}>
                            {disciplina.recomendacao}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Notas:</span>
                            <div className="mt-1">
                              <div>N1: {disciplina.notas.n1?.toFixed(1) || "-"}</div>
                              <div>N2: {disciplina.notas.n2?.toFixed(1) || "-"}</div>
                              <div>N3: {disciplina.notas.n3?.toFixed(1) || "-"}</div>
                              <div>N4: {disciplina.notas.n4?.toFixed(1) || "-"}</div>
                              <div className="font-medium">Média: {disciplina.notas.media.toFixed(2)}</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Faltas:</span>
                            <div className="mt-1">
                              <div>Total: {disciplina.faltas}</div>
                              <div>Justificadas: {disciplina.faltasJustificadas}</div>
                            </div>
                          </div>
                        </div>
                        {disciplina.observacoes && (
                          <div className="mt-3">
                            <span className="font-medium text-sm">Observações:</span>
                            <p className="text-sm text-gray-600 mt-1">{disciplina.observacoes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Observações Gerais */}
              {selectedAluno.observacoesGerais && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Observações Gerais</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedAluno.observacoesGerais}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => selectedAluno && handleDefinirDecisao(selectedAluno)}>
              <Edit className="h-4 w-4 mr-2" />
              Definir Decisão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Decisão Final */}
      <Dialog open={isDecisaoDialogOpen} onOpenChange={setIsDecisaoDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Definir Decisão Final - {selectedAluno?.nome}</DialogTitle>
            <DialogDescription>
              Defina a decisão final do conselho para este aluno
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleSalvarDecisao(); }}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="decisao">Decisão Final</Label>
                <Select value={decisaoData.decisao} onValueChange={(value) => setDecisaoData({...decisaoData, decisao: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a decisão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aprovado">Aprovado</SelectItem>
                    <SelectItem value="recuperacao">Recuperação</SelectItem>
                    <SelectItem value="reprovado">Reprovado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="observacoes">Observações Gerais</Label>
                <Textarea
                  value={decisaoData.observacoes}
                  onChange={(e) => setDecisaoData({...decisaoData, observacoes: e.target.value})}
                  placeholder="Observações gerais sobre o aluno..."
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
              <Button type="button" variant="outline" onClick={() => setIsDecisaoDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Salvar Decisão
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
