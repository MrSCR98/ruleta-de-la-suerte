'use client'

import { OptionsPanel } from '@/components/options-panel'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Wheel } from '@/components/wheel'
import { Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const DEFAULT_OPTIONS = [
  'Pizza',
  'Sushi',
  'Tacos',
  'Hamburguesa',
  'Ensalada',
  'Pasta',
]

export function WheelSpinner() {
  const [options, setOptions] = useState<string[]>(DEFAULT_OPTIONS)
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [wheelSize, setWheelSize] = useState(320)
  const containerRef = useRef<HTMLDivElement>(null)

  // Ajusta el tamaño de la ruleta de forma responsive.
  useEffect(() => {
    function updateSize() {
      const el = containerRef.current
      if (!el) return
      const available = Math.min(el.clientWidth, window.innerHeight * 0.6)
      setWheelSize(Math.max(260, Math.min(520, available)))
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  function spin() {
    if (spinning || options.length < 2) return
    setShowResult(false)
    setWinner(null)
    setSpinning(true)

    const count = options.length
    const anglePer = 360 / count
    const winnerIndex = Math.floor(Math.random() * count)

    // El puntero esta arriba (12 en punto). El canvas dibuja el segmento 0
    // empezando a las 3 en punto (0 rad). Calculamos la rotacion necesaria
    // para que el centro del segmento ganador quede bajo el puntero.
    const segmentCenter = winnerIndex * anglePer + anglePer / 2
    const targetUnderPointer = 270 // 12 en punto en el sistema del canvas
    const extraSpins = 5 * 360
    const current = rotation % 360
    const delta = (targetUnderPointer - segmentCenter - current + 720) % 360
    const finalRotation = rotation + extraSpins + delta

    setRotation(finalRotation)

    window.setTimeout(() => {
      setSpinning(false)
      setWinner(options[winnerIndex])
      setShowResult(true)
    }, 5100)
  }

  function addOption(label: string) {
    setOptions((prev) => [...prev, label])
  }

  function editOption(index: number, label: string) {
    setOptions((prev) => prev.map((o, i) => (i === index ? label : o)))
  }

  function removeOption(index: number) {
    setOptions((prev) => prev.filter((_, i) => i !== index))
  }

  function clearOptions() {
    setOptions([])
    toast('Se han eliminado todas las opciones.')
  }

  const canSpin = options.length >= 2 && !spinning

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
      {/* Ruleta */}
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col items-center gap-6 py-8">
          <div
            ref={containerRef}
            className="relative flex w-full justify-center"
          >
            {/* Puntero */}
            <div
              className="absolute -top-1 left-1/2 z-10 -translate-x-1/2"
              aria-hidden
            >
              <div className="size-0 border-x-14 border-t-24 border-x-transparent border-t-primary drop-shadow" />
            </div>
            <Wheel options={options} rotation={rotation} size={wheelSize} />
          </div>

          <Button
            size="lg"
            onClick={spin}
            disabled={!canSpin}
            className="min-w-44 text-base"
          >
            <Sparkles data-icon="inline-start" />
            {spinning ? 'Girando…' : '¡Girar!'}
          </Button>
          {options.length < 2 && (
            <p className="text-sm text-muted-foreground">
              Añade al menos 2 opciones para poder girar.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Panel de opciones */}
      <Card>
        <CardContent className="py-6">
          <OptionsPanel
            options={options}
            disabled={spinning}
            onAdd={addOption}
            onEdit={editOption}
            onRemove={removeOption}
            onClear={clearOptions}
          />
        </CardContent>
      </Card>

      {/* Resultado */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="text-center sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
              <Sparkles className="size-6 text-primary" />
              ¡Resultado!
            </DialogTitle>
            <DialogDescription>La ruleta ha elegido…</DialogDescription>
          </DialogHeader>
          <p className="text-pretty wrap-anywhere py-4 text-3xl font-bold font-heading text-primary">
            {winner}
          </p>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setShowResult(false)}>
              Cerrar
            </Button>
            <Button
              onClick={() => {
                setShowResult(false)
                setTimeout(spin, 200)
              }}
            >
              Girar de nuevo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
