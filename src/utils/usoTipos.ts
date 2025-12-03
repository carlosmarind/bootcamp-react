/* eslint-disable @typescript-eslint/no-unused-vars */

// Ejemplos didácticos de tipos en TypeScript
// ------------------------------------------

// 1. Unión de tipos (Type Union)
// Permite que una variable o propiedad acepte varios tipos posibles.
// Ejemplo: puede ser string o number.
type Id = string | number;

// Uso:
let userId: Id = 123;      // válido
userId = "abc-123";        // también válido
// userId = true;          // Error: boolean no es parte de Id

// 2. Intersección de tipos (Type Intersection)
// Combina varios tipos en uno solo que tiene todas las propiedades de ambos.
type Name = { name: string };
type Age = { age: number };
type Person = Name & Age; // Debe tener name y age

const persona: Person = { name: "Ana", age: 30 };

// 3. Omit<T, K>
// Crea un tipo a partir de otro, excluyendo una o más propiedades.
type User = { id: number; name: string; email: string; password: string };
type PublicUser = Omit<User, "password">;
// PublicUser tiene id, name, email pero NO password
const usuarioPublico: PublicUser = { id: 1, name: "Carlos", email: "c@x.com" };

// 4. Pick<T, K>
// Crea un tipo seleccionando solo ciertas propiedades de otro tipo.
type UserPreview = Pick<User, "id" | "name">;
const vistaUsuario: UserPreview = { id: 2, name: "Luisa" };

// 5. Extender tipos (herencia de tipos)
// Puedes crear un nuevo tipo basado en otro, agregando o cambiando propiedades.
type Admin = User & { role: "admin" };
const admin: Admin = { id: 99, name: "Root", email: "root@x.com", password: "1234", role: "admin" };

// 6. Generics (Tipos Genéricos)
// -----------------------------
// Los "genéricos" permiten escribir tipos y funciones reutilizables que
// funcionan con múltiples tipos, manteniendo la información de tipos.

// 6.1 Tipo genérico básico
// T es un "parámetro de tipo" que será sustituido por un tipo concreto.
type Box<T> = { value: T };
const boxString: Box<string> = { value: "hola" };
const boxNumber: Box<number> = { value: 42 };

// 6.2 Función genérica básica
// La función preserva el tipo de entrada y salida gracias al genérico T.
function identity<T>(x: T): T {
  return x;
}
const sameText = identity<string>("texto");
const sameNum = identity(123); // T se infiere como number

// 6.3 Varios parámetros de tipo (T, U)
// Combina dos tipos genéricos en una tupla (par ordenado).
type Pair<T, U> = { first: T; second: U };
const pair1: Pair<string, number> = { first: "id", second: 10 };
const pair2: Pair<UserPreview, Roles> = { first: { id: 7, name: "Eva" }, second: "user" };

// 6.4 Genéricos con restricción (extends)
// Limitamos T para que sea un objeto con una propiedad `id: number`.
type WithId<T extends { id: number }> = T & { uuid: string };
const withIdUser: WithId<User> = { id: 1, name: "C", email: "c@x.com", password: "x", uuid: "u-123" };

// 7. Añadir atributos a un tipo existente (por composición)
// Puedes usar intersección (&) o declarar un nuevo tipo que extienda otro.
type WithTimestamps<T> = T & { createdAt: Date; updatedAt: Date };
type UserWithTimestamps = WithTimestamps<User>;
const usuarioConFechas: UserWithTimestamps = {
  id: 3,
  name: "Mario",
  email: "m@x.com",
  password: "secreto",
  createdAt: new Date(),
  updatedAt: new Date()
};

// 8. Ejemplo de utilidad: Partial<T>
// Hace que todas las propiedades de un tipo sean opcionales.
type UserDraft = Partial<User>;
const borrador: UserDraft = { name: "Solo nombre" }; // válido, solo name

// 9. Ejemplo de utilidad: Required<T>
// Hace que todas las propiedades sean obligatorias.
type UserRequired = Required<UserDraft>;
// const u: UserRequired = {} // Error: faltan todas las propiedades

// 10. Ejemplo de utilidad: Record<K, T>
// Crea un objeto con claves de tipo K y valores de tipo T.
type Roles = "admin" | "user" | "guest";
type RolePermissions = Record<Roles, string[]>;
const permisos: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

// 11. Ejemplo de utilidad: Exclude<T, U>
// Excluye de T los tipos que están en U.
type Status = "active" | "inactive" | "banned";
type VisibleStatus = Exclude<Status, "banned">; // "active" | "inactive"

// 12. Ejemplo de utilidad: Extract<T, U>
// Extrae de T los tipos que también están en U.
type AllowedStatus = Extract<Status, "active" | "pending">; // "active"

// Puedes probar estos ejemplos en un archivo .ts o en el playground de TypeScript.
