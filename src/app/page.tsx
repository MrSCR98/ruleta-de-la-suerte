import { WheelSpinner } from '@/components/wheel-spinner'

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col gap-8 px-4 py-8 md:py-12">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="text-balance text-3xl font-bold font-heading md:text-4xl">
          Ruleta de la suerte
        </h1>
        <p className="text-pretty text-muted-foreground">
          Añade, edita o elimina tus opciones y haz girar la ruleta para
          decidir.
        </p>
      </header>
      <WheelSpinner />
    </main>
  )
}
