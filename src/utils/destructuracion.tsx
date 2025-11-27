/*
    Archivo: destructuracion.tsx
    Contenido: Ejemplos de desestructuración en TypeScript (objetos y arreglos),
    con interfaces tipadas, renombrado (alias), valores por defecto, desestructuración
    anidada y uso en parámetros de función y props en React.
*/

import React from 'react'

// ---------- Ejemplo: tipado de un objeto y desestructuración básica ----------
interface Person {
    firstName: string
    lastName: string
    age?: number // opcional
    nationality?: string
    [key: string]: unknown // permite atributos dinámicos
}

const defaultPerson: Person = {
    firstName: 'Adriana',
    lastName: 'Lopez',
    age: 35,
    nationality: 'chilena'
}

function exampleObjectDestructuring() {
    // Extraemos propiedades del objeto y creamos variables locales
    const { firstName, lastName, nationality: country = 'Desconocido', age: years = 0, ...rest } = defaultPerson

    // Propiedad dinámica por clave: evitamos 'any' usando Record<string, unknown>
    const key = 'lastName'
    const lastNameByKey = (defaultPerson as Record<string, unknown>)[key] as string

    console.log('Objeto: ', { firstName, lastName, country, years, lastNameByKey, rest })
    return { firstName, lastName, country, years, lastNameByKey, rest }
}

// ---------- Ejemplo: Desestructuración en arreglos (arrays) ----------
function exampleArrayDestructuring() {
    const numbers: number[] = [10, 20, 30, 40, 50]

    // Desestructuración simple
    const [first, second] = numbers

    // Saltar elementos
    const [, , third] = numbers

    // Operador rest para obtener el resto del arreglo
    const [one, ...rest] = numbers

    // Intercambio de variables sin variable temporal
    let a = 1
    let b = 2
    ;[a, b] = [b, a]

    console.log('Array: ', { first, second, third, one, rest, a, b })
    return { first, second, third, one, rest, a, b }
}

// ---------- Ejemplo: Desestructuración anidada y con tipos ----------
interface Course {
    title: string
    content: {
        durationHours: number
        module: string
    }
}

function exampleNestedDestructuring() {
    const course: Course = {
        title: 'React + TypeScript',
        content: {
            durationHours: 12,
            module: 'Fundamentos'
        }
    }

    // Tomamos 'title' y la propiedad anidada 'durationHours'
    const { title, content: { durationHours } } = course
    console.log('Curso: ', { title, durationHours })

    // También podemos renombrar la propiedad anidada
    const { content: { module: moduleName } } = course
    console.log('Módulo: ', moduleName)

    return { title, durationHours, moduleName }
}

// ---------- Ejemplo: Destructuring en parámetros de función ----------
interface User {
    id: number
    email: string
    profile?: {
        displayName?: string
    }
}

// Desestructuramos en parámetros y asignamos valores por defecto
function greetUser({ email, profile: { displayName } = {} }: User) {
    const displayNameOrEmail = displayName ?? email
    return `Hola ${displayNameOrEmail}!` // usamos operador nullish ?? para valor alternativo
}

// ---------- Ejemplo: Tuplas y desestructuración con tipos explícitos ----------
function exampleTuple() {
    const tuple: [string, number, boolean] = ['foo', 42, true]
    const [stringVal, numberVal, booleanVal] = tuple
    console.log('Tupla', stringVal, numberVal, booleanVal)
    return { stringVal, numberVal, booleanVal }
}

// ---------- Ejemplo: Desestructuración en React props ----------
export interface ComponentProps {
    title: string
    value?: number
}

export const ExampleComponent: React.FC<ComponentProps> = ({ title, value = 0 }) => {
    // Props destructuradas con valor por defecto
    return (
        <div>
            <h3>{title}</h3>
            <p>Value: {value}</p>
        </div>
    )
}

// ---------- Export principal: componente que muestra varios ejemplos ----------
export const DestructuringDemo: React.FC = () => {
    const obj = exampleObjectDestructuring()
    const arr = exampleArrayDestructuring()
    const nested = exampleNestedDestructuring()
    const tupleData = exampleTuple()
    const greeting = greetUser({ id: 1, email: 'usuario@ejemplo.com' })

    return (
        <div>
            <h2>Destructuring (TS)</h2>
            <p>Object: {JSON.stringify(obj)}</p>
            <p>Array: {JSON.stringify(arr)}</p>
            <p>Nested: {JSON.stringify(nested)}</p>
            <p>Tuple: {JSON.stringify(tupleData)}</p>
            <p>Greeting: {greeting}</p>
        </div>
    )
}

/*
    Resumen rápido:
    - La desestructuración permite extraer propiedades de objetos y elementos de arreglos.
    - Puedes renombrar variables (alias), asignar valores por defecto y extraer datos anidados.
    - También funciona para parámetros de funciones y props de React.
*/

export default DestructuringDemo