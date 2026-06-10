// Paleta de colores vivos para los segmentos de la ruleta.
// Se asignan de forma cíclica segun el indice de la opcion.
export const SEGMENT_COLORS = [
  "#84cc16", // lime
  "#f97316", // orange
  "#0ea5e9", // sky
  "#ec4899", // pink
  "#14b8a6", // teal
  "#eab308", // yellow
  "#8b5cf6", // violet
  "#ef4444", // red
  "#22c55e", // green
  "#3b82f6", // blue
]

export function getSegmentColor(index: number) {
  return SEGMENT_COLORS[index % SEGMENT_COLORS.length]
}

// Devuelve un color de texto legible (negro o blanco) segun el fondo.
export function getContrastText(hex: string) {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? "#1a1a1a" : "#ffffff"
}
