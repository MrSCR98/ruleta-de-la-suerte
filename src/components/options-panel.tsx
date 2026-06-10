'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { getSegmentColor } from '@/lib/wheel-colors'
import { Check, Pencil, Plus, Shuffle, Trash2, X } from 'lucide-react'
import { useState } from 'react'

interface OptionsPanelProps {
  options: string[]
  disabled: boolean
  onAdd: (label: string) => void
  onEdit: (index: number, label: string) => void
  onRemove: (index: number) => void
  onClear: () => void
}

export function OptionsPanel({
  options,
  disabled,
  onAdd,
  onEdit,
  onRemove,
  onClear,
}: OptionsPanelProps) {
  const [newLabel, setNewLabel] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  function handleAdd() {
    const value = newLabel.trim()
    if (!value) return
    onAdd(value)
    setNewLabel('')
  }

  function startEdit(index: number) {
    setEditingIndex(index)
    setEditValue(options[index])
  }

  function commitEdit() {
    if (editingIndex === null) return
    const value = editValue.trim()
    if (value) onEdit(editingIndex, value)
    setEditingIndex(null)
    setEditValue('')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold font-heading">
          Opciones{' '}
          <span className="text-muted-foreground">({options.length})</span>
        </h2>
        {options.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            disabled={disabled}
          >
            Vaciar todo
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Añadir opción…"
          disabled={disabled}
          aria-label="Nueva opción"
        />
        <Button onClick={handleAdd} disabled={disabled || !newLabel.trim()}>
          <Plus data-icon="inline-start" />
          Añadir
        </Button>
      </div>

      <ScrollArea className="h-[clamp(240px,40vh,440px)] pr-3">
        {options.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12 text-center text-muted-foreground">
            <Shuffle className="size-6 opacity-60" />
            <p className="text-sm">Añade al menos 2 opciones para girar.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {options.map((option, index) => (
              <li
                key={index}
                className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2"
              >
                <span
                  className="size-4 shrink-0 rounded-full"
                  style={{ backgroundColor: getSegmentColor(index) }}
                  aria-hidden
                />
                {editingIndex === index ? (
                  <>
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitEdit()
                        if (e.key === 'Escape') setEditingIndex(null)
                      }}
                      autoFocus
                      className="h-8"
                      aria-label="Editar opción"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={commitEdit}
                    >
                      <Check />
                      <span className="sr-only">Guardar</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => setEditingIndex(null)}
                    >
                      <X />
                      <span className="sr-only">Cancelar</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <span className={cn('flex-1 truncate text-sm')}>
                      {option}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => startEdit(index)}
                      disabled={disabled}
                    >
                      <Pencil />
                      <span className="sr-only">Editar {option}</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 text-destructive hover:text-destructive"
                      onClick={() => onRemove(index)}
                      disabled={disabled}
                    >
                      <Trash2 />
                      <span className="sr-only">Eliminar {option}</span>
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  )
}
