'use client'

import { getContrastText, getSegmentColor } from '@/lib/wheel-colors'
import { useEffect, useRef } from 'react'

interface WheelProps {
  options: string[]
  rotation: number // grados
  size: number // px
}

export function Wheel({ options, rotation, size }: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const center = size / 2
    const radius = center - 4
    const count = options.length

    ctx.clearRect(0, 0, size, size)

    if (count === 0) {
      ctx.beginPath()
      ctx.arc(center, center, radius, 0, Math.PI * 2)
      ctx.fillStyle = '#e5e5e5'
      ctx.fill()
      return
    }

    const anglePer = (Math.PI * 2) / count

    for (let i = 0; i < count; i++) {
      const start = i * anglePer
      const end = start + anglePer
      const color = getSegmentColor(i)

      // Segmento
      ctx.beginPath()
      ctx.moveTo(center, center)
      ctx.arc(center, center, radius, start, end)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(255,255,255,0.85)'
      ctx.stroke()

      // Texto
      ctx.save()
      ctx.translate(center, center)
      const mid = start + anglePer / 2
      ctx.rotate(mid)
      ctx.textBaseline = 'middle'
      const label = options[i]

      // Margen (padding) a cada lado: dejamos espacio respecto al borde
      // exterior y al círculo central para que el texto no quede pegado.
      const padding = Math.max(16, radius * 0.08)
      const innerEdge = radius * 0.16 + padding // cerca del centro
      const outerEdge = radius - padding // cerca del borde
      const available = outerEdge - innerEdge // ancho útil para el texto
      const textRadius = (innerEdge + outerEdge) / 2 // centrado en esa zona

      // Tamaño que escala con el radio, con un mínimo legible.
      const maxFont = Math.max(16, Math.min(24, radius / 8 - count * 0.3))
      const minFont = 12
      let fontSize = maxFont
      const setFont = (s: number) =>
        (ctx.font = `700 ${s}px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`)

      // Reducimos la fuente hasta que quepa, pero sin bajar del mínimo.
      setFont(fontSize)
      while (ctx.measureText(label).width > available && fontSize > minFont) {
        fontSize -= 1
        setFont(fontSize)
      }

      // Si aún no cabe al tamaño mínimo, truncamos con puntos suspensivos.
      let text = label
      if (ctx.measureText(text).width > available) {
        while (
          text.length > 1 &&
          ctx.measureText(text + '…').width > available
        ) {
          text = text.slice(0, -1)
        }
        text = text + '…'
      }

      // Si el segmento cae en la mitad izquierda, giramos el texto 180º
      // para que nunca quede boca abajo.
      const normalized = ((mid % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
      const flip = normalized > Math.PI / 2 && normalized < (3 * Math.PI) / 2
      ctx.textAlign = 'center'
      ctx.fillStyle = getContrastText(color)
      if (flip) {
        ctx.rotate(Math.PI)
        ctx.fillText(text, -textRadius, 0)
      } else {
        ctx.fillText(text, textRadius, 0)
      }
      ctx.restore()
    }

    // Circulo central
    ctx.beginPath()
    ctx.arc(center, center, radius * 0.12, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'
    ctx.stroke()
  }, [options, size])

  return (
    <div
      className="rounded-full shadow-xl"
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
        }}
        className="rounded-full"
        role="img"
        aria-label={`Ruleta con ${options.length} opciones`}
      />
    </div>
  )
}
