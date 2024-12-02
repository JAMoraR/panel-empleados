# Documentación para `PanelAdministrativo`

## Resumen
El componente `PanelAdministrativo` es una interfaz interactiva desarrollada con **Next.js** y **TypeScript** que permite gestionar una lista de empleados. Los usuarios pueden:
- Agregar nuevos empleados con un nombre y sueldo inicial.
- Editar el sueldo de los empleados individualmente.
- Eliminar empleados de la lista.
- Aplicar cambios porcentuales globales a los sueldos de todos los empleados.

## Estructura del código

### Interfaces
#### `Empleado`
Define la estructura de un empleado:
- **`id`**: Número único que identifica al empleado.
- **`nombre`**: Nombre del empleado.
- **`sueldo`**: Sueldo actual del empleado.
- **`editando`**: Indica si el empleado está en modo de edición.
- **`eliminando`**: Indica si el empleado está en proceso de eliminación.
- **`sueldoTemporal`**: Sueldo temporal para cambios antes de confirmarse.

---

### Hooks principales
#### **`useState`**
1. `empleados`: Lista de empleados gestionada por el componente.
2. `nuevoNombre`: Nombre del nuevo empleado a agregar.
3. `nuevoSueldo`: Sueldo del nuevo empleado a agregar.
4. `porcentajeGlobal`: Porcentaje de ajuste aplicado globalmente a los sueldos.

#### **`useToast`**
Permite mostrar notificaciones en la interfaz al completar acciones importantes, como agregar, editar o eliminar empleados.

---

### Funciones principales
#### **Agregar un empleado**
`agregarEmpleado`
- Crea un nuevo empleado con los valores ingresados.
- Agrega al empleado a la lista y resetea los campos de entrada.

#### **Editar sueldo**
1. `iniciarEdicion(id: number)`: Activa el modo de edición para un empleado específico.
2. `actualizarSueldoTemporal(id: number, valor: string)`: Actualiza el valor temporal del sueldo mientras el usuario edita.
3. `confirmarEdicion(id: number)`: Confirma y guarda el nuevo sueldo.
4. `cancelarEdicion(id: number)`: Cancela la edición y restaura el valor original.

#### **Eliminar un empleado**
1. `iniciarEliminacion(id: number)`: Activa el modo de confirmación de eliminación.
2. `confirmarEliminacion(id: number)`: Elimina al empleado de la lista.
3. `cancelarEliminacion(id: number)`: Cancela el proceso de eliminación.

#### **Aplicar cambios globales**
`aplicarCambioGlobal`
- Ajusta todos los sueldos de los empleados según un porcentaje especificado.

---

### Interfaz de usuario
#### **Inputs y botones**
1. Campos de entrada para agregar un nuevo empleado (`nombre`, `sueldo`).
2. Botones para agregar, editar, eliminar y aplicar cambios globales.

#### **Tabla**
Presenta la lista de empleados con las siguientes columnas:
1. **Nombre**: Nombre del empleado.
2. **Sueldo**: Campo editable (en modo de edición).
3. **Acciones**: Permite editar o eliminar al empleado.

#### **Cambio global**
Incluye un campo para introducir un porcentaje de ajuste global que se aplicará a todos los sueldos.

---

### Flujo de trabajo
1. **Agregar empleado**: Ingresar nombre y sueldo → Clic en "Agregar Empleado".
2. **Editar sueldo**:
   - Clic en "Editar" → Modificar sueldo en el campo → Clic en "Confirmar".
   - Opción: Cancelar edición.
3. **Eliminar empleado**:
   - Clic en "Eliminar" → Confirmar eliminación o cancelar.
4. **Cambio global**: Introducir porcentaje → Clic en "Aplicar Cambio Global".

---

### Dependencias
- **Componentes UI**: `Button`, `Input`, `Table` (encabezado, filas, celdas).
- **Hook**: `useToast` para mostrar notificaciones.

---

### Mejoras posibles
1. **Validación adicional**:
   - Verificar que el sueldo ingresado sea positivo.
   - Manejar casos en que el nombre esté vacío.
2. **Feedback visual**:
   - Resaltar filas en modo de edición o eliminación.
3. **Paginación**:
   - Manejar grandes cantidades de empleados con paginación.
4. **Base de datos**:
   - Implementar una base de datos para guardar la información.
5. **Cuentas de usuarios**:
   - Implementar un sistema de cuentas de usuario.
