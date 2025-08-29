"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  GraduationCap,
  Home,
  Circle,
  FileText,
  Send,
  X,
  UserCheck,
  Bell,
  Calendar,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileBarChart,
  Download,
  Eye,
  Target,
  Award,
} from "lucide-react"

// Dados simulados
const turmasData = [
  {
    id: 1,
    nome: "3º Ano A - Ensino Médio",
    conselheiro: "Prof. Maria Silva",
    ano: "2024",
    alunos: 28,
    disciplinas: 12,
  },
  {
    id: 2,
    nome: "2º Ano B - Ensino Médio",
    conselheiro: "Prof. João Santos",
    ano: "2024",
    alunos: 30,
    disciplinas: 11,
  },
  { id: 3, nome: "1º Ano C - Ensino Médio", conselheiro: "Prof. Ana Costa", ano: "2024", alunos: 25, disciplinas: 10 },
  { id: 4, nome: "9º Ano A - Fundamental", conselheiro: "Prof. Carlos Lima", ano: "2024", alunos: 32, disciplinas: 9 },
  {
    id: 5,
    nome: "8º Ano B - Fundamental",
    conselheiro: "Prof. Lucia Ferreira",
    ano: "2024",
    alunos: 29,
    disciplinas: 9,
  },
]

// Dados simulados para conselhos de classe
const conselhosData = [
  {
    id: 1,
    turma: "3º Ano A",
    data: "2024-06-15",
    status: "agendado",
    participantes: 8,
    alunos: 28,
  },
  {
    id: 2,
    turma: "2º Ano B",
    data: "2024-06-18",
    status: "em_andamento",
    participantes: 6,
    alunos: 30,
  },
  {
    id: 3,
    turma: "1º Ano C",
    data: "2024-06-20",
    status: "pendente",
    participantes: 0,
    alunos: 25,
  },
]

// Dados simulados para alertas
const alertasData = [
  {
    id: 1,
    tipo: "avaliacao",
    titulo: "Avaliações Pendentes",
    descricao: "5 professores ainda não finalizaram as avaliações",
    prioridade: "alta",
    turma: "3º Ano A",
  },
  {
    id: 2,
    tipo: "conselho",
    titulo: "Conselho de Classe",
    descricao: "Conselho do 2º Ano B em andamento",
    prioridade: "media",
    turma: "2º Ano B",
  },
  {
    id: 3,
    tipo: "relatorio",
    titulo: "Relatórios Disponíveis",
    descricao: "3 relatórios de desempenho prontos para download",
    prioridade: "baixa",
    turma: "Geral",
  },
]

// Dados simulados para eventos
const eventosData = [
  {
    id: 1,
    titulo: "Conselho 3º Ano A",
    data: "2024-06-15",
    tipo: "conselho",
    turma: "3º Ano A",
  },
  {
    id: 2,
    titulo: "Conselho 2º Ano B",
    data: "2024-06-18",
    tipo: "conselho",
    turma: "2º Ano B",
  },
  {
    id: 3,
    titulo: "Prazo Avaliações",
    data: "2024-06-10",
    tipo: "prazo",
    turma: "Todas",
  },
  {
    id: 4,
    titulo: "Conselho 1º Ano C",
    data: "2024-06-20",
    tipo: "conselho",
    turma: "1º Ano C",
  },
]

// Dados simulados para métricas de desempenho
const metricasData = {
  aprovacaoGeral: 85.2,
  reprovacaoGeral: 8.5,
  recuperacaoGeral: 6.3,
  mediaGeral: 7.8,
  turmasComConselho: 3,
  turmasPendentes: 2,
  professoresAtivos: 12,
  alunosAtivos: 144,
}

// Dados simulados para gráfico de desempenho por turma
const desempenhoTurmas = [
  { turma: "3º Ano A", aprovados: 24, reprovados: 2, recuperacao: 2, media: 8.2 },
  { turma: "2º Ano B", aprovados: 26, reprovados: 3, recuperacao: 1, media: 7.9 },
  { turma: "1º Ano C", aprovados: 22, reprovados: 1, recuperacao: 2, media: 8.1 },
  { turma: "9º Ano A", aprovados: 28, reprovados: 2, recuperacao: 2, media: 7.7 },
  { turma: "8º Ano B", aprovados: 25, reprovados: 2, recuperacao: 2, media: 7.8 },
]

// Dados simulados para relatórios disponíveis
const relatoriosData = [
  {
    id: 1,
    titulo: "Relatório de Desempenho Geral",
    tipo: "desempenho",
    dataGeracao: "2024-06-12",
    tamanho: "2.3 MB",
    status: "disponivel",
  },
  {
    id: 2,
    titulo: "Relatório de Conselhos de Classe",
    tipo: "conselho",
    dataGeracao: "2024-06-10",
    tamanho: "1.8 MB",
    status: "disponivel",
  },
  {
    id: 3,
    titulo: "Relatório de Frequência",
    tipo: "frequencia",
    dataGeracao: "2024-06-08",
    tamanho: "3.1 MB",
    status: "disponivel",
  },
  {
    id: 4,
    titulo: "Relatório de Avaliações Pendentes",
    tipo: "avaliacao",
    dataGeracao: "2024-06-14",
    tamanho: "0.9 MB",
    status: "gerando",
  },
]

const menuItems = [
  { id: "inicio", label: "Início", icon: Home, active: true },
  { id: "ciclos", label: "Ciclos", icon: Circle, active: false },
  { id: "cursos", label: "Cursos", icon: FileText, active: false },
  { id: "alunos", label: "Alunos", icon: Users, active: false },
  { id: "disciplinas", label: "Disciplinas", icon: BookOpen, active: false },
  { id: "turmas", label: "Turmas", icon: Send, active: false },
  { id: "professores", label: "Professores", icon: UserCheck, active: false },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMenuItem, setActiveMenuItem] = useState("inicio")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    // Limpar dados de sessão (se houver)
    localStorage.removeItem("user")
    sessionStorage.clear()
    
    // Redirecionar para a página de login
    window.location.href = "/"
  }

  // Adicionar efeito para detectar mouse na borda esquerda
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Se o mouse estiver nos primeiros 20px da esquerda, mostrar sidebar
      if (e.clientX <= 20) {
        setSidebarOpen(true)
      }
      // Se o mouse sair da área da sidebar (mais de 280px da esquerda), esconder
      else if (e.clientX > 280 && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    // Adicionar listener para movimento do mouse
    document.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [sidebarOpen])

  const filteredData = turmasData.filter(
    (turma) =>
      turma.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.conselheiro.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredData.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const paginatedData = filteredData.slice(startIndex, startIndex + Number.parseInt(itemsPerPage))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendado":
        return "bg-blue-100 text-blue-800"
      case "em_andamento":
        return "bg-yellow-100 text-yellow-800"
      case "finalizado":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "media":
        return "bg-yellow-100 text-yellow-800"
      case "baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTipoEventoColor = (tipo: string) => {
    switch (tipo) {
      case "conselho":
        return "bg-blue-100 text-blue-800"
      case "prazo":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusRelatorioColor = (status: string) => {
    switch (status) {
      case "disponivel":
        return "bg-green-100 text-green-800"
      case "gerando":
        return "bg-yellow-100 text-yellow-800"
      case "erro":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMediaColor = (media: number) => {
    if (media >= 8.0) return "text-green-600"
    if (media >= 7.0) return "text-blue-600"
    if (media >= 6.0) return "text-yellow-600"
    return "text-red-600"
  }

  const calcularProgresso = (valor: number, total: number) => {
    return Math.min((valor / total) * 100, 100)
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
                      if (item.id === "ciclos") {
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
                  Dashboard
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
          {/* Header com Notificações */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Bem-vindo ao Conselho Pronto</h2>
              <p className="text-sm text-slate-600">Acompanhe o status dos conselhos e atividades da escola</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {alertasData.length}
                </span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total de Turmas</p>
                    <p className="text-2xl font-bold text-slate-900">{turmasData.length}</p>
                    <p className="text-xs text-green-600 mt-1">+2 este mês</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full shadow-md">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total de Alunos</p>
                    <p className="text-2xl font-bold text-slate-900">{metricasData.alunosAtivos}</p>
                    <p className="text-xs text-green-600 mt-1">+12 este mês</p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-500 to-slate-600 p-3 rounded-full shadow-md">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Taxa de Aprovação</p>
                    <p className="text-2xl font-bold text-slate-900">{metricasData.aprovacaoGeral}%</p>
                    <p className="text-xs text-green-600 mt-1">+2.1% vs mês anterior</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full shadow-md">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Conselhos Pendentes</p>
                    <p className="text-2xl font-bold text-slate-900">{conselhosData.filter(c => c.status === "pendente").length}</p>
                    <p className="text-xs text-orange-600 mt-1">Requer atenção</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-full shadow-md">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card 
              className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => window.location.href = "/dashboard/turmas"}
            >
              <CardContent className="p-4 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Gerenciar Turmas</h3>
                <p className="text-xs text-slate-600">Acessar e configurar turmas</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => window.location.href = "/dashboard/conselho-classe"}
            >
              <CardContent className="p-4 text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <FileBarChart className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Conselhos de Classe</h3>
                <p className="text-xs text-slate-600">Acompanhar conselhos</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => window.location.href = "/dashboard/professores"}
            >
              <CardContent className="p-4 text-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Professores</h3>
                <p className="text-xs text-slate-600">Gerenciar permissões</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => window.location.href = "/dashboard/relatorios"}
            >
              <CardContent className="p-4 text-center">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Relatórios</h3>
                <p className="text-xs text-slate-600">Gerar relatórios</p>
              </CardContent>
            </Card>
          </div>

          {/* Métricas de Desempenho */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Gráfico de Desempenho por Turma */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                      Desempenho por Turma
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Médias e distribuição de aprovação
                    </CardDescription>
                  </div>
                                     <Button 
                     size="sm" 
                     variant="outline" 
                     className="text-purple-600 border-purple-200"
                     onClick={() => window.location.href = "/dashboard/desempenho"}
                   >
                     <TrendingUp className="h-4 w-4 mr-1" />
                     Detalhes
                   </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {desempenhoTurmas.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">{item.turma}</span>
                        <span className={`text-sm font-bold ${getMediaColor(item.media)}`}>
                          {item.media.toFixed(1)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${calcularProgresso(item.aprovados, item.aprovados + item.reprovados + item.recuperacao)}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Aprovados: {item.aprovados}</span>
                        <span>Recuperação: {item.recuperacao}</span>
                        <span>Reprovados: {item.reprovados}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Relatórios Disponíveis */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900 flex items-center">
                      <FileBarChart className="h-5 w-5 mr-2 text-green-600" />
                      Relatórios Disponíveis
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Acesse relatórios gerados automaticamente
                    </CardDescription>
                  </div>
                                     <Button 
                     size="sm" 
                     variant="outline" 
                     className="text-green-600 border-green-200"
                     onClick={() => window.location.href = "/dashboard/relatorios"}
                   >
                     <Download className="h-4 w-4 mr-1" />
                     Gerar Novo
                   </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {relatoriosData.map((relatorio) => (
                    <div key={relatorio.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-800 text-sm">{relatorio.titulo}</h4>
                        <Badge className={`text-xs ${getStatusRelatorioColor(relatorio.status)}`}>
                          {relatorio.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>{new Date(relatorio.dataGeracao).toLocaleDateString("pt-BR")}</span>
                        <span>{relatorio.tamanho}</span>
                      </div>
                      {relatorio.status === "disponivel" && (
                        <Button size="sm" variant="outline" className="w-full mt-2 text-green-600 border-green-200">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Alertas e Notificações */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg h-full">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-slate-900 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                        Alertas Importantes
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        Pendências e notificações urgentes
                      </CardDescription>
                    </div>
                    <Badge className="bg-red-100 text-red-800">
                      {alertasData.filter(a => a.prioridade === "alta").length} Urgentes
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {alertasData.map((alerta) => (
                      <div key={alerta.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-800 text-sm">{alerta.titulo}</h4>
                            <p className="text-xs text-slate-600 mt-1">{alerta.descricao}</p>
                            <p className="text-xs text-blue-600 mt-1">{alerta.turma}</p>
                          </div>
                          <Badge className={`text-xs ${getPrioridadeColor(alerta.prioridade)}`}>
                            {alerta.prioridade}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conselhos de Classe */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg h-full">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-slate-900 flex items-center">
                        <FileBarChart className="h-5 w-5 mr-2 text-blue-600" />
                        Conselhos de Classe
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        Status dos conselhos agendados
                      </CardDescription>
                    </div>
                                         <Button 
                       size="sm" 
                       variant="outline" 
                       className="text-blue-600 border-blue-200"
                       onClick={() => window.location.href = "/dashboard/conselho-classe"}
                     >
                       <Eye className="h-4 w-4 mr-1" />
                       Ver Todos
                     </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {conselhosData.map((conselho) => (
                      <div key={conselho.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-800 text-sm">{conselho.turma}</h4>
                          <Badge className={`text-xs ${getStatusColor(conselho.status)}`}>
                            {conselho.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>{new Date(conselho.data).toLocaleDateString("pt-BR")}</span>
                          <span>{conselho.participantes} participantes</span>
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                          {conselho.alunos} alunos
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendário de Eventos */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg h-full">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-slate-900 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-green-600" />
                        Próximos Eventos
                      </CardTitle>
                      <CardDescription className="text-slate-600">
                        Calendário de atividades
                      </CardDescription>
                    </div>
                                         <Button 
                       size="sm" 
                       variant="outline" 
                       className="text-green-600 border-green-200"
                       onClick={() => window.location.href = "/dashboard/calendario"}
                     >
                       <Calendar className="h-4 w-4 mr-1" />
                       Calendário
                     </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {eventosData.slice(0, 4).map((evento) => (
                      <div key={evento.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-800 text-sm">{evento.titulo}</h4>
                          <Badge className={`text-xs ${getTipoEventoColor(evento.tipo)}`}>
                            {evento.tipo}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>{new Date(evento.data).toLocaleDateString("pt-BR")}</span>
                          <span>{evento.turma}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Seção de Turmas */}
          <div className="mt-8">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900">Gestão de Turmas</CardTitle>
                    <CardDescription className="text-slate-600">
                      Gerencie as turmas e acesse os conselhos de classe
                    </CardDescription>
                  </div>
                                     <Button 
                     className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                     onClick={() => window.location.href = "/dashboard/turmas"}
                   >
                     <Plus className="h-4 w-4 mr-2" />
                     Nova Turma
                   </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Pesquisar turmas..."
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
                <div className="border border-blue-100 rounded-lg overflow-hidden shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-blue-100">
                        <TableHead className="font-semibold text-slate-700">Turma</TableHead>
                        <TableHead className="font-semibold text-slate-700">Conselheiro</TableHead>
                        <TableHead className="font-semibold text-slate-700">Ano</TableHead>
                        <TableHead className="font-semibold text-slate-700">Alunos</TableHead>
                        <TableHead className="font-semibold text-slate-700">Disciplinas</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((turma) => (
                        <TableRow key={turma.id} className="hover:bg-blue-50/50 transition-colors">
                          <TableCell className="font-medium text-slate-900">{turma.nome}</TableCell>
                          <TableCell className="text-slate-700">{turma.conselheiro}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                              {turma.ano}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-700">{turma.alunos}</TableCell>
                          <TableCell className="text-slate-700">{turma.disciplinas}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hover:bg-blue-100">
                                  <MoreHorizontal className="h-4 w-4 text-blue-600" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Alterar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
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
                  <p className="text-sm text-slate-600">
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
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
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
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
