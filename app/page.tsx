"use client"

import { PanelAdministrativo } from '@/components/panel-administrativo'
import { Toaster } from '@/components/ui/toaster'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel Administrativo de Empleados</h1>
      <PanelAdministrativo />
      <Toaster />
    </main>
  )
}

