"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from "@/hooks/use-toast"


interface Empleado {
  id: number
  nombre: string
  sueldo: number
  editando: boolean
  eliminando: boolean
  sueldoTemporal: string
}

export function PanelAdministrativo() {
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoSueldo, setNuevoSueldo] = useState('')
  const [porcentajeGlobal, setPorcentajeGlobal] = useState('')
  const { toast } = useToast()

  const agregarEmpleado = () => {
    if (nuevoNombre && nuevoSueldo) {
      const nuevoEmpleado: Empleado = {
        id: Date.now(),
        nombre: nuevoNombre,
        sueldo: parseFloat(nuevoSueldo),
        editando: false,
        eliminando: false,
        sueldoTemporal: nuevoSueldo
      }
      setEmpleados([...empleados, nuevoEmpleado])
      setNuevoNombre('')
      setNuevoSueldo('')
      toast({
        title: "Empleado agregado",
        description: `${nuevoNombre} ha sido agregado con un sueldo de $${nuevoSueldo}`,
      })
    }
  }

  const iniciarEliminacion = (id: number) => {
    setEmpleados(empleados.map(emp =>
      emp.id === id ? { ...emp, eliminando: true } : emp
    ))
  }

  const cancelarEliminacion = (id: number) => {
    setEmpleados(empleados.map(emp =>
      emp.id === id ? { ...emp, eliminando: false } : emp
    ))
  }

  const confirmarEliminacion = (id: number) => {
    setEmpleados(empleados.filter(emp => emp.id !== id))
    toast({
      title: "Empleado eliminado",
      description: "El empleado ha sido eliminado correctamente",
    })
  }

  const iniciarEdicion = (id: number) => {
    setEmpleados(empleados.map(emp =>
      emp.id === id ? { ...emp, editando: true, sueldoTemporal: emp.sueldo.toString() } : emp
    ))
  }

  const cancelarEdicion = (id: number) => {
    setEmpleados(empleados.map(emp =>
      emp.id === id ? { ...emp, editando: false, sueldoTemporal: emp.sueldo.toString() } : emp
    ))
  }

  const confirmarEdicion = (id: number) => {
    setEmpleados(empleados.map(emp => {
      if (emp.id === id) {
        const nuevoSueldo = parseFloat(emp.sueldoTemporal)
        if (!isNaN(nuevoSueldo)) {
          return { ...emp, sueldo: nuevoSueldo, editando: false }
        }
      }
      return emp
    }))
    toast({
      title: "Sueldo modificado",
      description: `El sueldo ha sido actualizado correctamente`,
    })
  }

  const actualizarSueldoTemporal = (id: number, valor: string) => {
    setEmpleados(empleados.map(emp =>
      emp.id === id ? { ...emp, sueldoTemporal: valor } : emp
    ))
  }

  const aplicarCambioGlobal = () => {
    const porcentaje = parseFloat(porcentajeGlobal)
    if (!isNaN(porcentaje)) {
      setEmpleados(empleados.map(emp => ({
        ...emp,
        sueldo: emp.sueldo * (1 + porcentaje / 100)
      })))
      setPorcentajeGlobal('')
      toast({
        title: "Cambio global aplicado",
        description: `Se ha aplicado un cambio del ${porcentaje}% a todos los sueldos`,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Nombre del empleado"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Sueldo"
          value={nuevoSueldo}
          onChange={(e) => setNuevoSueldo(e.target.value)}
        />
        <Button onClick={agregarEmpleado}>Agregar Empleado</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Sueldo</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {empleados.map((empleado) => (
            <TableRow key={empleado.id}>
              <TableCell>{empleado.nombre}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={empleado.editando ? empleado.sueldoTemporal : empleado.sueldo}
                  onChange={(e) => actualizarSueldoTemporal(empleado.id, e.target.value)}
                  disabled={!empleado.editando}
                />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {empleado.editando ? (
                    <>
                      <Button onClick={() => confirmarEdicion(empleado.id)}>Confirmar</Button>
                      <Button variant="outline" onClick={() => cancelarEdicion(empleado.id)}>Cancelar</Button>
                    </>
                  ) : empleado.eliminando ? (
                    <>
                      <Button variant="destructive" onClick={() => confirmarEliminacion(empleado.id)}>Confirmar</Button>
                      <Button variant="outline" onClick={() => cancelarEliminacion(empleado.id)}>Cancelar</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => iniciarEdicion(empleado.id)}>Editar</Button>
                      <Button variant="destructive" onClick={() => iniciarEliminacion(empleado.id)}>Eliminar</Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex space-x-2">
        <Input
          type="number"
          placeholder="Porcentaje de cambio global"
          value={porcentajeGlobal}
          onChange={(e) => setPorcentajeGlobal(e.target.value)}
        />
        <Button onClick={aplicarCambioGlobal}>Aplicar Cambio Global</Button>
      </div>
    </div>
  )
}

