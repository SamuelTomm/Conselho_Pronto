"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, User, Users, Calendar, ClipboardList } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Mock Data para simular as informações
const mockDisciplinesByCourse = {
  1: [
    // Formação Básica
    { id: 101, nome: "Matemática", professor: "Prof. Ana", cargaHoraria: 80 },
    { id: 102, nome: "Português", professor: "Prof. Carlos", cargaHoraria: 80 },
    { id: 103, nome: "História", professor: "Prof. Maria", cargaHoraria: 60 },
    { id: 104, nome: "Geografia", professor: "Prof. Pedro", cargaHoraria: 60 },
    { id: 105, nome: "Ciências", professor: "Prof. Laura", cargaHoraria: 70 },
    { id: 106, nome: "Educação Física", professor: "Prof. Ricardo", cargaHoraria: 40 },
    { id: 107, nome: "Artes", professor: "Prof. Sofia", cargaHoraria: 40 },
    { id: 108, nome: "Inglês", professor: "Prof. Daniel", cargaHoraria: 50 },
  ],
  2: [
    // Itinerário de Exatas
    { id: 201, nome: "Física Avançada", professor: "Prof. João", cargaHoraria: 90 },
    { id: 202, nome: "Cálculo I", professor: "Prof. Pedro", cargaHoraria: 100 },
    { id: 203, nome: "Química Orgânica", professor: "Prof. Fernanda", cargaHoraria: 80 },
    { id: 204, nome: "Geometria Analítica", professor: "Prof. João", cargaHoraria: 70 },
    { id: 205, nome: "Estatística", professor: "Prof. Pedro", cargaHoraria: 60 },
    { id: 206, nome: "Programação Básica", professor: "Prof. Laura", cargaHoraria: 90 },
  ],
  4: [
    // Técnico em Informática
    { id: 401, nome: "Programação Web", professor: "Prof. Laura", cargaHoraria: 120 },
    { id: 402, nome: "Banco de Dados", professor: "Prof. Ricardo", cargaHoraria: 90 },
    { id: 403, nome: "Redes de Computadores", professor: "Prof. Daniel", cargaHoraria: 80 },
    { id: 404, nome: "Sistemas Operacionais", professor: "Prof. Sofia", cargaHoraria: 70 },
    { id: 405, nome: "Algoritmos e Estruturas de Dados", professor: "Prof. Laura", cargaHoraria: 100 },
    { id: 406, nome: "Segurança da Informação", professor: "Prof. Ricardo", cargaHoraria: 60 },
  ],
}

const mockStudentsInDisciplineForCourse = {
  "1-101": [
    // Course 1, Discipline 101 (Matemática)
    { id: 1, nome: "Ana Silva Santos", turma: "1º A", matricula: "2024001" },
    { id: 2, nome: "Bruno Costa Lima", turma: "1º A", matricula: "2024002" },
    { id: 3, nome: "Carla Oliveira", turma: "2º B", matricula: "2024003" },
    { id: 4, nome: "Diego Ferreira", turma: "3º A", matricula: "2024004" },
  ],
  "1-102": [
    // Course 1, Discipline 102 (Português)
    { id: 1, nome: "Ana Silva Santos", turma: "1º A", matricula: "2024001" },
    { id: 4, nome: "Diego Ferreira", turma: "3º A", matricula: "2024004" },
    { id: 5, nome: "Eduardo Mendes", turma: "2º A", matricula: "2024005" },
  ],
  "4-401": [
    // Course 4, Discipline 401 (Programação Web)
    { id: 8, nome: "Helena Cardoso", turma: "1º TI", matricula: "2024008" },
    { id: 9, nome: "Igor Nascimento", turma: "2º TI", matricula: "2024009" },
    { id: 10, nome: "Julia Martins", turma: "1º TI", matricula: "2024010" },
  ],
}

const mockStudentDisciplinePerformance = {
  "1-101-1": {
    // Course 1, Discipline 101, Student 1 (Ana Silva Santos)
    notas: [{ bimestre: "1º", n1: 8.5, n2: 9.0, n3: 8.0, n4: 9.5, rec: null, media: 8.75, status: "Aprovado" }],
    faltas: [
      { data: "2024-03-10", justificadas: 1, naoJustificadas: 0, observacao: "Atestado médico" },
      { data: "2024-04-05", justificadas: 0, naoJustificadas: 1, observacao: "Atraso" },
    ],
    infoAdicional: "Excelente participação e dedicação. Sempre entrega os trabalhos no prazo.",
  },
  "1-101-2": {
    // Course 1, Discipline 101, Student 2 (Bruno Costa Lima)
    notas: [{ bimestre: "1º", n1: 6.0, n2: 7.0, n3: 5.5, n4: 6.5, rec: 7.0, media: 6.5, status: "Aprovado" }],
    faltas: [{ data: "2024-03-15", justificadas: 0, naoJustificadas: 1, observacao: "Faltou sem justificativa" }],
    infoAdicional: "Precisa melhorar a atenção em sala de aula. Recuperação bem-sucedida.",
  },
  "1-102-1": {
    // Course 1, Discipline 102, Student 1 (Ana Silva Santos)
    notas: [{ bimestre: "1º", n1: 9.0, n2: 8.5, n3: 9.0, n4: 9.0, rec: null, media: 8.88, status: "Aprovado" }],
    faltas: [],
    infoAdicional: "Ótima leitura e interpretação de texto.",
  },
  "4-401-8": {
    // Course 4, Discipline 401, Student 8 (Helena Cardoso)
    notas: [{ bimestre: "1º", n1: 9.0, n2: 8.5, n3: 9.5, n4: 9.0, rec: null, media: 9.0, status: "Aprovado" }],
    faltas: [],
    infoAdicional: "Aluna exemplar, com grande aptidão para programação. Ajuda os colegas.",
  },
  "4-401-9": {
    // Course 4, Discipline 401, Student 9 (Igor Nascimento)
    notas: [{ bimestre: "1º", n1: 7.0, n2: 7.5, n3: 6.5, n4: 7.0, rec: null, media: 7.0, status: "Aprovado" }],
    faltas: [{ data: "2024-05-01", justificadas: 0, naoJustificadas: 1, observacao: "Feriado prolongado" }],
    infoAdicional: "Bom raciocínio lógico, mas precisa praticar mais a sintaxe.",
  },
}

interface CourseDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  course: any // The selected course object
}

export function CourseDetailsDialog({ open, onOpenChange, course }: CourseDetailsDialogProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<any>(null)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [searchTermDiscipline, setSearchTermDiscipline] = useState("")
  const [searchTermStudent, setSearchTermStudent] = useState("")

  // Reset states when dialog closes or course changes
  useEffect(() => {
    if (!open || !course) {
      setSelectedDiscipline(null)
      setSelectedStudent(null)
      setSearchTermDiscipline("")
      setSearchTermStudent("")
    }
  }, [open, course])

  const disciplinesForCourse = mockDisciplinesByCourse[course?.id as keyof typeof mockDisciplinesByCourse] || []
  const filteredDisciplines = disciplinesForCourse.filter(
    (d) =>
      d.nome.toLowerCase().includes(searchTermDiscipline.toLowerCase()) ||
      d.professor.toLowerCase().includes(searchTermDiscipline.toLowerCase()),
  )

  const studentsInSelectedDiscipline = selectedDiscipline
    ? mockStudentsInDisciplineForCourse[
        `${course.id}-${selectedDiscipline.id}` as keyof typeof mockStudentsInDisciplineForCourse
      ] || []
    : []

  const filteredStudents = studentsInSelectedDiscipline.filter(
    (s) =>
      s.nome.toLowerCase().includes(searchTermStudent.toLowerCase()) ||
      s.matricula.toLowerCase().includes(searchTermStudent.toLowerCase()),
  )

  const studentPerformance =
    selectedStudent && selectedDiscipline
      ? mockStudentDisciplinePerformance[
          `${course.id}-${selectedDiscipline.id}-${selectedStudent.id}` as keyof typeof mockStudentDisciplinePerformance
        ]
      : null

  const getMediaColor = (media: number) => {
    if (media >= 8.0) return "text-green-600"
    if (media >= 6.0) return "text-orange-500"
    return "text-red-600"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Detalhes do Curso: {course?.nome}</DialogTitle>
          <DialogDescription>Visualize as disciplinas, notas e faltas dos alunos neste curso.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Disciplines List */}
          <div className="w-1/3 border-r pr-4 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Disciplinas do Curso</h3>
            <Input
              placeholder="Buscar disciplina..."
              value={searchTermDiscipline}
              onChange={(e) => setSearchTermDiscipline(e.target.value)}
              className="mb-4"
            />
            <ScrollArea className="flex-1 pr-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Professor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDisciplines.length > 0 ? (
                    filteredDisciplines.map((discipline) => (
                      <TableRow
                        key={discipline.id}
                        onClick={() => {
                          setSelectedDiscipline(discipline)
                          setSelectedStudent(null) // Reset student selection
                          setSearchTermStudent("")
                        }}
                        className={`cursor-pointer transition-colors ${selectedDiscipline?.id === discipline.id ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-blue-50/50"}`}
                      >
                        <TableCell className="font-medium">{discipline.nome}</TableCell>
                        <TableCell>{discipline.professor}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-gray-500 py-4">
                        Nenhuma disciplina encontrada para este curso.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* Right Panel: Discipline/Student Details */}
          <div className="w-2/3 pl-4 flex flex-col">
            {!selectedDiscipline ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <BookOpen className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg">Selecione uma disciplina para ver os detalhes.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">Detalhes da Disciplina: {selectedDiscipline.nome}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Professor</CardTitle>
                      <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedDiscipline.professor}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Carga Horária</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedDiscipline.cargaHoraria}h</div>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="my-4" />

                <h4 className="text-md font-semibold mb-2">Alunos na Disciplina</h4>
                <Input
                  placeholder="Buscar aluno..."
                  value={searchTermStudent}
                  onChange={(e) => setSearchTermStudent(e.target.value)}
                  className="mb-4"
                />
                <ScrollArea className="flex-1 pr-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Matrícula</TableHead>
                        <TableHead>Turma</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <TableRow
                            key={student.id}
                            onClick={() => setSelectedStudent(student)}
                            className={`cursor-pointer transition-colors ${selectedStudent?.id === student.id ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-blue-50/50"}`}
                          >
                            <TableCell className="font-medium">{student.nome}</TableCell>
                            <TableCell>{student.matricula}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{student.turma}</Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                            Nenhum aluno encontrado nesta disciplina para este curso.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>

                {selectedStudent && studentPerformance ? (
                  <>
                    <Separator className="my-4" />
                    <h4 className="text-md font-semibold mb-2">
                      Desempenho de {selectedStudent.nome} em {selectedDiscipline.nome}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Média Final</CardTitle>
                          <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div
                            className={`text-2xl font-bold ${getMediaColor(Number.parseFloat(studentPerformance.notas[0]?.media || "0"))}`}
                          >
                            {studentPerformance.notas[0]?.media || "N/A"}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Faltas (Total/Just.)</CardTitle>
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {studentPerformance.faltas.reduce((sum, f) => sum + f.justificadas + f.naoJustificadas, 0)}{" "}
                            / {studentPerformance.faltas.reduce((sum, f) => sum + f.justificadas, 0)}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <h5 className="text-sm font-semibold mb-2">Notas por Bimestre</h5>
                    <Table className="mb-4">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bimestre</TableHead>
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
                        {studentPerformance.notas.map((nota, index) => (
                          <TableRow key={index}>
                            <TableCell>{nota.bimestre}</TableCell>
                            <TableCell>{nota.n1}</TableCell>
                            <TableCell>{nota.n2}</TableCell>
                            <TableCell>{nota.n3}</TableCell>
                            <TableCell>{nota.n4}</TableCell>
                            <TableCell>{nota.rec || "-"}</TableCell>
                            <TableCell className={`font-medium ${getMediaColor(Number.parseFloat(nota.media))}`}>
                              {nota.media}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  nota.status === "Aprovado"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }
                              >
                                {nota.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <h5 className="text-sm font-semibold mb-2">Histórico de Faltas</h5>
                    {studentPerformance.faltas.length > 0 ? (
                      <Table className="mb-4">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Justificadas</TableHead>
                            <TableHead>Não Justificadas</TableHead>
                            <TableHead>Observação</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentPerformance.faltas.map((falta, index) => (
                            <TableRow key={index}>
                              <TableCell>{falta.data}</TableCell>
                              <TableCell>{falta.justificadas}</TableCell>
                              <TableCell>{falta.naoJustificadas}</TableCell>
                              <TableCell>{falta.observacao}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-gray-500 mb-4">Nenhuma falta registrada.</p>
                    )}

                    <h5 className="text-sm font-semibold mb-2">Informações Adicionais (Professor)</h5>
                    <Card className="mb-4">
                      <CardContent className="p-4 text-sm text-gray-700">
                        {studentPerformance.infoAdicional || "Nenhuma informação adicional disponível."}
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  selectedDiscipline &&
                  filteredStudents.length > 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <Users className="h-16 w-16 mb-4 text-gray-300" />
                      <p className="text-lg">Selecione um aluno para ver seu desempenho nesta disciplina.</p>
                    </div>
                  )
                )}
                {selectedDiscipline && filteredStudents.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Users className="h-16 w-16 mb-4 text-gray-300" />
                    <p className="text-lg">Nenhum aluno encontrado nesta disciplina para este curso.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
