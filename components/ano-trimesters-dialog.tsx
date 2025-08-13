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
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"
import { TrimestreDashboardDialog } from "@/components/trimestre-dashboard-dialog" // Novo componente

interface AnoTrimestersDialogProps {
  ano: { id: number; ano: number; descricao: string }
  isOpen: boolean
  onClose: () => void
}

export function AnoTrimestersDialog({ ano, isOpen, onClose }: AnoTrimestersDialogProps) {
  const [isTrimestreDashboardOpen, setIsTrimestreDashboardOpen] = useState(false)
  const [selectedTrimestre, setSelectedTrimestre] = useState<any>(null)

  const trimesters = [
    { id: 1, nome: "1º Trimestre", periodo: "Janeiro - Abril" },
    { id: 2, nome: "2º Trimestre", periodo: "Maio - Agosto" },
    { id: 3, nome: "3º Trimestre", periodo: "Setembro - Dezembro" },
  ]

  const handleViewTrimestre = (trimestre: any) => {
    setSelectedTrimestre(trimestre)
    setIsTrimestreDashboardOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Trimestres do Ano Letivo: {ano.ano}</DialogTitle>
            <DialogDescription>{ano.descricao}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {trimesters.map((trimestre) => (
              <Card
                key={trimestre.id}
                className="flex items-center justify-between p-4 border-blue-100 bg-blue-50/30 hover:bg-blue-50/50 transition-colors"
              >
                <div>
                  <CardTitle className="text-lg text-blue-800">{trimestre.nome}</CardTitle>
                  <CardDescription className="text-blue-600">{trimestre.periodo}</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleViewTrimestre(trimestre)}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar Dashboard
                </Button>
              </Card>
            ))}
          </div>
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

      {selectedTrimestre && (
        <TrimestreDashboardDialog
          ano={ano}
          trimestre={selectedTrimestre}
          isOpen={isTrimestreDashboardOpen}
          onClose={() => setIsTrimestreDashboardOpen(false)}
        />
      )}
    </>
  )
}
