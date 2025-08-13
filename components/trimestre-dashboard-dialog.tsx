"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Users, BookOpen, Calendar, ClipboardList } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TrimestreDashboardDialogProps {
  ano: { id: number; ano: number; descricao: string }
  trimestre: { id: number; nome: string; periodo: string }
  isOpen: boolean
  onClose: () => void
}

// --- Dados Mock para o Dashboard do Trimestre ---
const mockAlunos = [
  {
    id: 1,
    matricula: "2023001",
    nome: "Ana Clara Silva",
    turma: "9º A",
    mediaGeral: 8.5,
    faltasTotal: 5,
    faltasJustificadas: 2,
    notas: [
      { disciplina: "Matemática", n1: 9.0, n2: 8.0, n3: 9.5, n4: 8.5, rec: null, media: 8.75, situacao: "Aprovado" },
      { disciplina: "Português", n1: 7.0, n2: 7.5, n3: 8.0, n4: 7.0, rec: null, media: 7.38, situacao: "Aprovado" },
      { disciplina: "História", n1: 6.0, n2: 5.5, n3: 7.0, n4: 6.5, rec: 7.0, media: 6.5, situacao: "Aprovado" },
      { disciplina: "Geografia", n1: 8.5, n2: 8.0, n3: 9.0, n4: 8.8, rec: null, media: 8.58, situacao: "Aprovado" },
    ],
    historicoAcademico: "Bom desempenho geral, com algumas dificuldades em história no início.",
  },
  {
    id: 2,
    matricula: "2023002",
    nome: "Bruno Costa",
    turma: "9º A",
    mediaGeral: 6.2,
    faltasTotal: 8,
    faltasJustificadas: 2,
    notas: [
      { disciplina: "Matemática", n1: 5.0, n2: 4.5, n3: 6.0, n4: 5.5, rec: 6.0, media: 5.25, situacao: "Reprovado" },
      { disciplina: "Português", n1: 7.0, n2: 6.5, n3: 7.0, n4: 6.8, rec: null, media: 6.83, situacao: "Aprovado" },
      { disciplina: "Física", n1: 6.0, n2: 5.5, n3: 6.2, n4: 5.8, rec: 6.5, media: 5.88, situacao: "Reprovado" },
    ],
    historicoAcademico: "Necessita de acompanhamento em matemática e física. Melhorou no final do trimestre.",
  },
  {
    id: 3,
    matricula: "2023003",
    nome: "Carla Dias",
    turma: "1º B",
    mediaGeral: 7.9,
    faltasTotal: 3,
    faltasJustificadas: 1,
    notas: [
      { disciplina: "Química", n1: 8.8, n2: 9.1, n3: 9.0, n4: 8.9, rec: null, media: 8.95, situacao: "Aprovado" },
      { disciplina: "Biologia", n1: 7.5, n2: 7.0, n3: 7.8, n4: 7.2, rec: null, media: 7.38, situacao: "Aprovado" },
    ],
    historicoAcademico: "Aluna dedicada, com bom desempenho em todas as disciplinas.",
  },
]

const mockTurmas = [
  {
    id: 1,
    nome: "9º A",
    periodo: "Manhã",
    totalAlunos: 25,
    mediaGeralTurma: 7.35,
    alunos: [
      { id: 1, nome: "Ana Clara Silva", mediaTrimestre: 8.5, faltas: 5 },
      { id: 2, nome: "Bruno Costa", mediaTrimestre: 6.2, faltas: 8 },
      { id: 4, nome: "Daniela Pereira", mediaTrimestre: 7.9, faltas: 2 },
    ],
  },
  {
    id: 2,
    nome: "1º B",
    periodo: "Tarde",
    totalAlunos: 22,
    mediaGeralTurma: 8.1,
    alunos: [
      { id: 3, nome: "Carla Dias", mediaTrimestre: 7.9, faltas: 3 },
      { id: 5, nome: "Elisa Fernandes", mediaTrimestre: 8.8, faltas: 0 },
    ],
  },
]

export function TrimestreDashboardDialog({ ano, trimestre, isOpen, onClose }: TrimestreDashboardDialogProps) {
  const [activeTab, setActiveTab] = useState("alunos")
  const [searchTermAluno, setSearchTermAluno] = useState("")
  const [searchTermTurma, setSearchTermTurma] = useState("")
  const [selectedAluno, setSelectedAluno] = useState<any>(null)
  const [selectedTurma, setSelectedTurma] = useState<any>(null)

  const filteredAlunos = mockAlunos.filter(
    (aluno) =>
      aluno.nome.toLowerCase().includes(searchTermAluno.toLowerCase()) ||
      aluno.matricula.toLowerCase().includes(searchTermAluno.toLowerCase()) ||
      aluno.turma.toLowerCase().includes(searchTermAluno.toLowerCase()),
  )

  const filteredTurmas = mockTurmas.filter(
    (turma) =>
      turma.nome.toLowerCase().includes(searchTermTurma.toLowerCase()) ||
      turma.periodo.toLowerCase().includes(searchTermTurma.toLowerCase()),
  )

  const getMediaColor = (media: number) => {
    if (media >= 8.0) return "text-green-600"
    if (media >= 6.0) return "text-yellow-600" // Cor para médias intermediárias
    return "text-red-600"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            Dashboard: {trimestre.nome} - {ano.ano}
          </DialogTitle>
          <DialogDescription>
            Visão geral e detalhes de alunos e turmas para o {trimestre.nome} do ano de {ano.ano}.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="alunos" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2 bg-blue-50">
            <TabsTrigger
              value="alunos"
              onClick={() => {
                setActiveTab("alunos")
                setSelectedAluno(null)
                setSelectedTurma(null)
              }}
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Alunos
            </TabsTrigger>
            <TabsTrigger
              value="turmas"
              onClick={() => {
                setActiveTab("turmas")
                setSelectedAluno(null)
                setSelectedTurma(null)
              }}
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Turmas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alunos" className="flex-1 flex flex-col overflow-hidden data-[state=inactive]:hidden">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden pt-4">
              <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Lista de Alunos</CardTitle>
                </CardHeader>
                <div className="p-4 pt-0">
                  <Input
                    placeholder="Buscar aluno..."
                    value={searchTermAluno}
                    onChange={(e) => setSearchTermAluno(e.target.value)}
                    className="mb-4"
                  />
                </div>
                <ScrollArea className="flex-1">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Turma</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAlunos.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center text-gray-500">
                            Nenhum aluno encontrado.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAlunos.map((aluno) => (
                          <TableRow
                            key={aluno.id}
                            onClick={() => setSelectedAluno(aluno)}
                            className={
                              selectedAluno?.id === aluno.id
                                ? "bg-blue-50 cursor-pointer border-l-4 border-blue-600"
                                : "cursor-pointer hover:bg-blue-50/50"
                            }
                          >
                            <TableCell className="font-medium">{aluno.nome}</TableCell>
                            <TableCell>{aluno.turma}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              <div className="md:col-span-2 border rounded-lg p-4 overflow-y-auto">
                {selectedAluno ? (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800">Detalhes do Aluno: {selectedAluno.nome}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="border-blue-100 bg-blue-50/30">
                        <CardContent className="flex items-center p-4">
                          <User className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <Label className="text-sm text-gray-500">Matrícula</Label>
                            <p className="text-lg font-bold">{selectedAluno.matricula}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-blue-100 bg-blue-50/30">
                        <CardContent className="flex items-center p-4">
                          <Users className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <Label className="text-sm text-gray-500">Turma</Label>
                            <p className="text-lg font-bold">{selectedAluno.turma}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-blue-100 bg-blue-50/30">
                        <CardContent className="flex items-center p-4">
                          <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <Label className="text-sm text-gray-500">Média Trimestre</Label>
                            <p className={`text-lg font-bold ${getMediaColor(selectedAluno.mediaGeral)}`}>
                              {selectedAluno.mediaGeral.toFixed(2)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-blue-100 bg-blue-50/30">
                        <CardContent className="flex items-center p-4">
                          <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <Label className="text-sm text-gray-500">Faltas (Total/Just.)</Label>
                            <p className="text-lg font-bold">
                              {selectedAluno.faltasTotal} / {selectedAluno.faltasJustificadas}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <h4 className="text-lg font-semibold mt-6">Notas por Disciplina</h4>
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
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedAluno.notas.map((nota: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{nota.disciplina}</TableCell>
                            <TableCell>{nota.n1?.toFixed(1) || "-"}</TableCell>
                            <TableCell>{nota.n2?.toFixed(1) || "-"}</TableCell>
                            <TableCell>{nota.n3?.toFixed(1) || "-"}</TableCell>
                            <TableCell>{nota.n4?.toFixed(1) || "-"}</TableCell>
                            <TableCell>{nota.rec !== null ? nota.rec.toFixed(1) : "-"}</TableCell>
                            <TableCell>
                              <span className={getMediaColor(nota.media)}>{nota.media?.toFixed(2) || "-"}</span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  nota.situacao === "Aprovado"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }
                              >
                                {nota.situacao}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <h4 className="text-lg font-semibold mt-6">Histórico Acadêmico</h4>
                    <p className="text-gray-700">{selectedAluno.historicoAcademico}</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Selecione um aluno para visualizar os detalhes.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="turmas" className="flex-1 flex flex-col overflow-hidden data-[state=inactive]:hidden">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden pt-4">
              <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Lista de Turmas</CardTitle>
                </CardHeader>
                <div className="p-4 pt-0">
                  <Input
                    placeholder="Buscar turma..."
                    value={searchTermTurma}
                    onChange={(e) => setSearchTermTurma(e.target.value)}
                    className="mb-4"
                  />
                </div>
                <ScrollArea className="flex-1">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Período</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTurmas.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center text-gray-500">
                            Nenhuma turma encontrada.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTurmas.map((turma) => (
                          <TableRow
                            key={turma.id}
                            onClick={() => setSelectedTurma(turma)}
                            className={
                              selectedTurma?.id === turma.id
                                ? "bg-blue-50 cursor-pointer border-l-4 border-blue-600"
                                : "cursor-pointer hover:bg-blue-50/50"
                            }
                          >
                            <TableCell className="font-medium">{turma.nome}</TableCell>
                            <TableCell>{turma.periodo}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              <div className="md:col-span-2 border rounded-lg p-4 overflow-y-auto">
                {selectedTurma ? (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800">Detalhes da Turma: {selectedTurma.nome}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="border-blue-100 bg-blue-50/30">
                        <CardContent className="flex items-center p-4">
                          <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <Label className="text-sm text-gray-500">Período</Label>
                            <p className="text-lg font-bold">{selectedTurma.periodo}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-blue-100 bg-blue-50/30">
                        <CardContent className="flex items-center p-4">
                          <Users className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <Label className="text-sm text-gray-500">Total de Alunos</Label>
                            <p className="text-lg font-bold">{selectedTurma.totalAlunos}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="sm:col-span-2 border-blue-100 bg-blue-50/30">
                        <CardContent className="flex items-center p-4">
                          <ClipboardList className="h-5 w-5 text-blue-600 mr-3" />
                          <div>
                            <Label className="text-sm text-gray-500">Média Geral Trimestre</Label>
                            <p className={`text-lg font-bold ${getMediaColor(selectedTurma.mediaGeralTurma)}`}>
                              {selectedTurma.mediaGeralTurma.toFixed(2)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <h4 className="text-lg font-semibold mt-6">Alunos da Turma</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome do Aluno</TableHead>
                          <TableHead>Média Trimestre</TableHead>
                          <TableHead>Faltas</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedTurma.alunos.map((aluno: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{aluno.nome}</TableCell>
                            <TableCell className={getMediaColor(aluno.mediaTrimestre)}>
                              {aluno.mediaTrimestre?.toFixed(2) || "-"}
                            </TableCell>
                            <TableCell>{aluno.faltas}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Selecione uma turma para visualizar os detalhes.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="bg-blue-50/30 border-t border-blue-100">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
