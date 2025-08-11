"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Plus, MoreHorizontal, Edit, Trash2, User, LogOut, Settings, ChevronLeft, ChevronRight, School, Users, BookOpen, Home, Circle, FileText, Send, Eye } from 'lucide-react'
import { AnoTrimestersDialog } from "@/components/ano-trimesters-dialog" // Novo componente

// Dados simulados dos anos
const anosData = [
  { id: 1, ano: 2023, descricao: "Ano letivo de 2023" },
  { id: 2, ano: 2024, descricao: "Ano letivo de 2024" },
  { id: 3, ano: 2025, descricao: "Ano letivo de 2025" },
]

const menuItems = [
  { id: "inicio", label: "Início", icon: Home, active: false },
  { id: "ciclos", label: "Anos Letivos", icon: Circle, active: true }, // Renomeado para Anos Letivos
  { id: "cursos", label: "Cursos", icon: FileText, active: false },
  { id: "alunos", label: "Alunos", icon: Users, active: false },
  { id: "disciplinas", label: "Disciplinas", icon: BookOpen, active: false },
  { id: "turmas", label: "Turmas", icon: Send, active: false },
]

export default function AnosLetivosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMenuItem, setActiveMenuItem] = useState("ciclos")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [anos, setAnos] = useState(anosData)
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false) // Para adicionar/editar ano
  const [isAnoTrimestersDialogOpen, setIsAnoTrimestersDialogOpen] = useState(false) // Para visualizar trimestres do ano
  const [editingAno, setEditingAno] = useState<any>(null)
  const [viewingAno, setViewingAno] = useState<any>(null) // Ano sendo visualizado
  const [formData, setFormData] = useState({ ano: "", descricao: "" })
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

  const filteredData = anos.filter(
    (anoItem) =>
      anoItem.ano.toString().includes(searchTerm) ||
      anoItem.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredData.length / Number.parseInt(itemsPerPage))
  const startIndex = (currentPage - 1) * Number.parseInt(itemsPerPage)
  const paginatedData = filteredData.slice(startIndex, startIndex + Number.parseInt(itemsPerPage))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.ano) {
      setError("O campo 'Ano' é obrigatório.")
      return
    }
    const anoValue = Number.parseInt(formData.ano)
    if (isNaN(anoValue) || anoValue < 1900 || anoValue > 2100) {
      setError("O ano deve ser um número válido entre 1900 e 2100.")
      return
    }

    if (editingAno) {
      // Editar ano existente
      setAnos(
        anos.map((anoItem) =>
          anoItem.id === editingAno.id
            ? { ...anoItem, ano: anoValue, descricao: formData.descricao }
            : anoItem,
        ),
      )
    } else {
      // Adicionar novo ano
      const newAno = {
        id: Math.max(...anos.map((a) => a.id)) + 1,
        ano: anoValue,
        descricao: formData.descricao,
      }
      setAnos([...anos, newAno])
    }

    setIsAddEditDialogOpen(false)
    setEditingAno(null)
    setFormData({ ano: "", descricao: "" })
  }

  const handleEdit = (anoItem: any) => {
    setEditingAno(anoItem)
    setFormData({ ano: anoItem.ano.toString(), descricao: anoItem.descricao || "" })
    setIsAddEditDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setAnos(anos.filter((anoItem) => anoItem.id !== id))
  }

  const handleViewAnoTrimesters = (anoItem: any) => {
    setViewingAno(anoItem)
    setIsAnoTrimestersDialogOpen(true)
  }

  const openNewDialog = () => {
    setEditingAno(null)
    setFormData({ ano: "", descricao: "" })
    setError("")
    setIsAddEditDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-500 p-2 rounded-lg">
              <School className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-semibold text-sm">Sistema Conselho</span>
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

      {/* Área invisível para trigger da sidebar */}
      <div className="fixed left-0 top-0 w-5 h-full z-40 bg-transparent" onMouseEnter={() => setSidebarOpen(true)} />

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Anos Letivos</h1>
                <p className="text-sm text-gray-500">Gerencie os anos letivos do sistema</p>
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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestão de Anos Letivos</CardTitle>
                  <CardDescription>Adicione, edite ou remova anos letivos</CardDescription>
                </div>
                <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={openNewDialog} className="bg-teal-600 hover:bg-teal-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Incluir Novo Ano
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{editingAno ? "Editar Ano Letivo" : "Novo Ano Letivo"}</DialogTitle>
                      <DialogDescription>
                        {editingAno ? "Edite as informações do ano." : "Adicione um novo ano letivo ao sistema."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="ano" className="text-right">
                            Ano
                          </Label>
                          <Input
                            id="ano"
                            type="number"
                            value={formData.ano}
                            onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                            className="col-span-3"
                            placeholder="Ex: 2025"
                            min="1900"
                            max="2100"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="descricao" className="text-right">
                            Descrição
                          </Label>
                          <Input
                            id="descricao"
                            value={formData.descricao}
                            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                            className="col-span-3"
                            placeholder="Ex: Ano letivo de 2025"
                          />
                        </div>
                      </div>
                      {error && (
                        <Alert variant="destructive" className="mb-4">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <DialogFooter>
                        <Button type="submit">{editingAno ? "Salvar" : "Adicionar"}</Button>
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
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ano</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="w-20 text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((anoItem) => (
                      <TableRow key={anoItem.id}>
                        <TableCell className="font-medium">{anoItem.ano}</TableCell>
                        <TableCell>{anoItem.descricao}</TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4 text-blue-600" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewAnoTrimesters(anoItem)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Visualizar Trimestres
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(anoItem)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Alterar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(anoItem.id)}>
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

      {/* Dialog para Visualizar Trimestres do Ano */}
      {viewingAno && (
        <AnoTrimestersDialog
          ano={viewingAno}
          isOpen={isAnoTrimestersDialogOpen}
          onClose={() => setIsAnoTrimestersDialogOpen(false)}
        />
      )}
    </div>
  )
}
