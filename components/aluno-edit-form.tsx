"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Save, MoreHorizontal, Calendar, BookOpen, User } from "lucide-react"

interface AlunoEditFormProps {
  aluno: any
  isOpen: boolean
  onClose: () => void
  onSave: (alunoData: any) => void
}

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

export function AlunoEditForm({ aluno, isOpen, onClose, onSave }: AlunoEditFormProps) {
  const [activeTab, setActiveTab] = useState("dados")
  const [formData, setFormData] = useState({
    matricula: aluno?.matricula || "",
    nome: aluno?.nome || "",
    email: aluno?.email || "",
    telefone: aluno?.telefone || "",
    dataNascimento: aluno?.dataNascimento || "",
    endereco: aluno?.endereco || "",
    turma: aluno?.turma || "",
    curso: aluno?.curso || "",
    responsavel: aluno?.responsavel || "",
    telefoneResponsavel: aluno?.telefoneResponsavel || "",
    status: aluno?.status || "Ativo",
    observacoes: aluno?.observacoes || "",
  })

  // Estados para notas
  const [notas, setNotas] = useState([
    { disciplina: "Matemática", n1: 8.5, n2: 7.8, n3: 8.2, n4: null, recuperacao: null, observacoes: "Boa evolução" },
    {
      disciplina: "Português",
      n1: 9.0,
      n2: 8.5,
      n3: 8.8,
      n4: null,
      recuperacao: null,
      observacoes: "Excelente redação",
    },
    { disciplina: "História", n1: 7.5, n2: 8.0, n3: 7.8, n4: null, recuperacao: null, observacoes: "Participativo" },
  ])

  // Estados para faltas
  const [faltas, setFaltas] = useState([
    { id: 1, disciplina: "Matemática", data: "2024-03-15", justificada: true, observacoes: "Consulta médica" },
    { id: 2, disciplina: "História", data: "2024-03-20", justificada: false, observacoes: "" },
    { id: 3, disciplina: "Português", data: "2024-04-02", justificada: true, observacoes: "Problema familiar" },
  ])

  // Estados para dialogs
  const [isNotaDialogOpen, setIsNotaDialogOpen] = useState(false)
  const [isFaltaDialogOpen, setIsFaltaDialogOpen] = useState(false)
  const [editingNota, setEditingNota] = useState<any>(null)
  const [editingFalta, setEditingFalta] = useState<any>(null)

  // Estados para formulários
  const [notaForm, setNotaForm] = useState({
    disciplina: "",
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    recuperacao: "",
    observacoes: "",
  })

  const [faltaForm, setFaltaForm] = useState({
    disciplina: "",
    data: "",
    justificada: false,
    observacoes: "",
  })

  const [error, setError] = useState("")

  const calcularMedia = (nota: any) => {
    const valores = [nota.n1, nota.n2, nota.n3, nota.n4].filter((n) => n !== null && n !== undefined)
    if (valores.length === 0) return 0
    const soma = valores.reduce((acc, val) => acc + val, 0)
    return soma / valores.length
  }

  const getMediaColor = (media: number) => {
    if (media >= 8.0) return "text-green-600"
    if (media >= 6.0) return "text-yellow-600"
    return "text-red-600"
  }

  const handleSave = () => {
    if (!formData.matricula || !formData.nome || !formData.turma || !formData.curso) {
      setError("Matrícula, nome, turma e curso são obrigatórios")
      return
    }

    const alunoCompleto = {
      ...aluno,
      ...formData,
      notas,
      faltas,
    }

    onSave(alunoCompleto)
    onClose()
  }

  const handleAddNota = () => {
    if (!notaForm.disciplina) {
      setError("Disciplina é obrigatória")
      return
    }

    const novaNota = {
      disciplina: notaForm.disciplina,
      n1: notaForm.n1 ? Number.parseFloat(notaForm.n1) : null,
      n2: notaForm.n2 ? Number.parseFloat(notaForm.n2) : null,
      n3: notaForm.n3 ? Number.parseFloat(notaForm.n3) : null,
      n4: notaForm.n4 ? Number.parseFloat(notaForm.n4) : null,
      recuperacao: notaForm.recuperacao ? Number.parseFloat(notaForm.recuperacao) : null,
      observacoes: notaForm.observacoes,
    }

    if (editingNota !== null) {
      const notasAtualizadas = [...notas]
      notasAtualizadas[editingNota] = novaNota
      setNotas(notasAtualizadas)
    } else {
      setNotas([...notas, novaNota])
    }

    setNotaForm({ disciplina: "", n1: "", n2: "", n3: "", n4: "", recuperacao: "", observacoes: "" })
    setEditingNota(null)
    setIsNotaDialogOpen(false)
    setError("")
  }

  const handleAddFalta = () => {
    if (!faltaForm.disciplina || !faltaForm.data) {
      setError("Disciplina e data são obrigatórias")
      return
    }

    const novaFalta = {
      id: editingFalta ? editingFalta.id : Math.max(...faltas.map((f) => f.id), 0) + 1,
      disciplina: faltaForm.disciplina,
      data: faltaForm.data,
      justificada: faltaForm.justificada,
      observacoes: faltaForm.observacoes,
    }

    if (editingFalta) {
      const faltasAtualizadas = faltas.map((f) => (f.id === editingFalta.id ? novaFalta : f))
      setFaltas(faltasAtualizadas)
    } else {
      setFaltas([...faltas, novaFalta])
    }

    setFaltaForm({ disciplina: "", data: "", justificada: false, observacoes: "" })
    setEditingFalta(null)
    setIsFaltaDialogOpen(false)
    setError("")
  }

  const handleEditNota = (index: number) => {
    const nota = notas[index]
    setNotaForm({
      disciplina: nota.disciplina,
      n1: nota.n1?.toString() || "",
      n2: nota.n2?.toString() || "",
      n3: nota.n3?.toString() || "",
      n4: nota.n4?.toString() || "",
      recuperacao: nota.recuperacao?.toString() || "",
      observacoes: nota.observacoes || "",
    })
    setEditingNota(index)
    setIsNotaDialogOpen(true)
  }

  const handleEditFalta = (falta: any) => {
    setFaltaForm({
      disciplina: falta.disciplina,
      data: falta.data,
      justificada: falta.justificada,
      observacoes: falta.observacoes,
    })
    setEditingFalta(falta)
    setIsFaltaDialogOpen(true)
  }

  const handleDeleteNota = (index: number) => {
    setNotas(notas.filter((_, i) => i !== index))
  }

  const handleDeleteFalta = (id: number) => {
    setFaltas(faltas.filter((f) => f.id !== id))
  }

  const tabs = [
    { id: "dados", label: "Dados Pessoais", icon: User },
    { id: "notas", label: "Notas", icon: BookOpen },
    { id: "faltas", label: "Faltas", icon: Calendar },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Editar Aluno - {aluno?.nome}</DialogTitle>
          <DialogDescription>
            Matrícula: {aluno?.matricula} | Turma: {aluno?.turma}
          </DialogDescription>
        </DialogHeader>

        <div className="flex h-[600px]">
          {/* Sidebar com Tabs */}
          <div className="w-48 border-r bg-gray-50 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600"
                        : "text-gray-600 hover:bg-blue-50/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "dados" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Informações Pessoais</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="matricula">Matrícula</Label>
                      <Input
                        id="matricula"
                        value={formData.matricula}
                        onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
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
                    <div className="col-span-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      />
                    </div>
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
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="curso">Curso</Label>
                      <Select
                        value={formData.curso}
                        onValueChange={(value) => setFormData({ ...formData, curso: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
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
                    <div className="col-span-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={formData.endereco}
                        onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="responsavel">Responsável</Label>
                      <Input
                        id="responsavel"
                        value={formData.responsavel}
                        onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefoneResponsavel">Telefone do Responsável</Label>
                      <Input
                        id="telefoneResponsavel"
                        value={formData.telefoneResponsavel}
                        onChange={(e) => setFormData({ ...formData, telefoneResponsavel: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        value={formData.observacoes}
                        onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notas" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Notas por Disciplina</h3>
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingNota(null)
                      setNotaForm({ disciplina: "", n1: "", n2: "", n3: "", n4: "", recuperacao: "", observacoes: "" })
                      setIsNotaDialogOpen(true)
                    }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  >
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
                      {notas.map((nota, index) => {
                        const media = calcularMedia(nota)
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{nota.disciplina}</TableCell>
                            <TableCell>{nota.n1?.toFixed(1) || "-"}</TableCell>
                            <TableCell>{nota.n2?.toFixed(1) || "-"}</TableCell>
                            <TableCell>{nota.n3?.toFixed(1) || "-"}</TableCell>
                            <TableCell>{nota.n4?.toFixed(1) || "-"}</TableCell>
                            <TableCell>{nota.recuperacao?.toFixed(1) || "-"}</TableCell>
                            <TableCell>
                              <span className={`font-medium ${getMediaColor(media)}`}>{media.toFixed(2)}</span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={media >= 6.0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                              >
                                {media >= 6.0 ? "Aprovado" : "Reprovado"}
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
                                  <DropdownMenuItem onClick={() => handleEditNota(index)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteNota(index)}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {activeTab === "faltas" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Registro de Faltas</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingFalta(null)
                      setFaltaForm({ disciplina: "", data: "", justificada: false, observacoes: "" })
                      setIsFaltaDialogOpen(true)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Falta
                  </Button>
                </div>

                {/* Resumo de Faltas */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{faltas.length}</p>
                        <p className="text-sm text-gray-600">Total de Faltas</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {faltas.filter((f) => f.justificada).length}
                        </p>
                        <p className="text-sm text-gray-600">Justificadas</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">
                          {faltas.filter((f) => !f.justificada).length}
                        </p>
                        <p className="text-sm text-gray-600">Não Justificadas</p>
                      </div>
                    </CardContent>
                  </Card>
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
                      {faltas.map((falta) => (
                        <TableRow key={falta.id}>
                          <TableCell className="font-medium">
                            {new Date(falta.data).toLocaleDateString("pt-BR")}
                          </TableCell>
                          <TableCell>{falta.disciplina}</TableCell>
                          <TableCell>
                            <Badge
                              className={falta.justificada ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
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
                                <DropdownMenuItem onClick={() => handleEditFalta(falta)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteFalta(falta.id)}>
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
              </div>
            )}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </DialogFooter>

        {/* Dialog para Adicionar/Editar Nota */}
        <Dialog open={isNotaDialogOpen} onOpenChange={setIsNotaDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingNota !== null ? "Editar Nota" : "Adicionar Nota"}</DialogTitle>
              <DialogDescription>
                {editingNota !== null ? "Edite as notas da disciplina" : "Adicione notas para uma disciplina"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="disciplina">Disciplina</Label>
                <Select
                  value={notaForm.disciplina}
                  onValueChange={(value) => setNotaForm({ ...notaForm, disciplina: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplinasOptions.map((disciplina) => (
                      <SelectItem key={disciplina} value={disciplina}>
                        {disciplina}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="n1">Nota 1</Label>
                  <Input
                    id="n1"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={notaForm.n1}
                    onChange={(e) => setNotaForm({ ...notaForm, n1: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="n2">Nota 2</Label>
                  <Input
                    id="n2"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={notaForm.n2}
                    onChange={(e) => setNotaForm({ ...notaForm, n2: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="n3">Nota 3</Label>
                  <Input
                    id="n3"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={notaForm.n3}
                    onChange={(e) => setNotaForm({ ...notaForm, n3: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="n4">Nota 4</Label>
                  <Input
                    id="n4"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={notaForm.n4}
                    onChange={(e) => setNotaForm({ ...notaForm, n4: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="recuperacao">Recuperação</Label>
                <Input
                  id="recuperacao"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={notaForm.recuperacao}
                  onChange={(e) => setNotaForm({ ...notaForm, recuperacao: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={notaForm.observacoes}
                  onChange={(e) => setNotaForm({ ...notaForm, observacoes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNotaDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddNota}>{editingNota !== null ? "Salvar" : "Adicionar"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog para Adicionar/Editar Falta */}
        <Dialog open={isFaltaDialogOpen} onOpenChange={setIsFaltaDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingFalta ? "Editar Falta" : "Registrar Falta"}</DialogTitle>
              <DialogDescription>
                {editingFalta ? "Edite o registro de falta" : "Registre uma nova falta do aluno"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="disciplina">Disciplina</Label>
                <Select
                  value={faltaForm.disciplina}
                  onValueChange={(value) => setFaltaForm({ ...faltaForm, disciplina: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplinasOptions.map((disciplina) => (
                      <SelectItem key={disciplina} value={disciplina}>
                        {disciplina}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="data">Data da Falta</Label>
                <Input
                  id="data"
                  type="date"
                  value={faltaForm.data}
                  onChange={(e) => setFaltaForm({ ...faltaForm, data: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="justificada"
                  checked={faltaForm.justificada}
                  onCheckedChange={(checked) => setFaltaForm({ ...faltaForm, justificada: checked as boolean })}
                />
                <Label htmlFor="justificada">Falta Justificada</Label>
              </div>
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={faltaForm.observacoes}
                  onChange={(e) => setFaltaForm({ ...faltaForm, observacoes: e.target.value })}
                  rows={3}
                  placeholder="Motivo da falta, justificativa, etc."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFaltaDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddFalta}>{editingFalta ? "Salvar" : "Registrar"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  )
}
