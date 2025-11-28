/*
	Archivo: expresiones.ts
	Contenido: Expresiones regulares comunes para validación de formularios.
	Los nombres de variables son en inglés; los comentarios en español.
*/

// Email común: local@domain.tld (no valida 100% todos los emails, pero suficiente para formularios)
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Nombre completo: permite letras (incluyendo acentos), espacios, guiones y apóstrofos. Longitud 3-40
const fullNameRegex: RegExp = /^[a-zA-ZÀ-ÿ'\s-]{3,40}$/

// Username: letras, números y guiones bajos. Longitud 3-16
const usernameRegex: RegExp = /^[a-zA-Z0-9_]{3,16}$/

// Teléfono internacional (E.164): +56912345678 o 56912345678
const e164PhoneRegex: RegExp = /^\+?[1-9]\d{1,14}$/

// Teléfono Chile con dash: 56X-XXXXXXXX (el formato original del proyecto)
const chilePhoneWithDashRegex: RegExp = /^56\d-[0-9]{8}$/

// Teléfono local (7 a 10 dígitos)
const localPhoneRegex: RegExp = /^[0-9]{7,10}$/

// Código Postal (US) o general 5 dígitos o 5-4
const usZipCodeRegex: RegExp = /^\d{5}(-\d{4})?$/

// URL simple: protocolo http(s) opcional, dominio y ruta opcional
const urlRegex: RegExp = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i

// Password fuerte: mínimo 8 caracteres, al menos una letra minúscula, una mayúscula, un número y un carácter especial
const strongPasswordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/

// Password débil/medio: 6-20 caracteres, al menos una letra y un número
const mediumPasswordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/

// Números enteros (positivo/negativo)
const integerRegex: RegExp = /^-?\d+$/

// Números decimales con hasta 2 decimales (ej: 12.34)
const decimal2Regex: RegExp = /^-?\d+(\.\d{1,2})?$/

// Color hex: #fff o #ffffff
const hexColorRegex: RegExp = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

// UUID v4
const uuidV4Regex: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// Fecha ISO simple YYYY-MM-DD (no valida rango de día/mes, solo formato)
const isoDateRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/

// Hora HH:MM (24h)
const timeHHMMSRegex: RegExp = /^([01]\d|2[0-3]):([0-5]\d)$/

// Tarjeta de crédito: 13-19 dígitos (sin validar Luhn)
const creditCardRegex: RegExp = /^\d{13,19}$/

// CVV 3 o 4 dígitos
const cvvRegex: RegExp = /^\d{3,4}$/

// Alfanumérico (sin espacios)
const alphaNumericRegex: RegExp = /^[a-zA-Z0-9]+$/

// Exportación por defecto de las expresiones principales (comodín)
// No exportamos un objeto por defecto aquí; crearemos un objeto por defecto compuesto al final

// ---------- Funciones auxiliares de validación (envoltorios alrededor de las expresiones regulares) ----------
// Devuelven true si la cadena cumple con la expresión regular.
export function isEmail(value: string): boolean {
	return emailRegex.test(String(value))
}

export function isFullName(value: string): boolean {
	return fullNameRegex.test(String(value))
}

export function isUsername(value: string): boolean {
	return usernameRegex.test(String(value))
}

export function isE164Phone(value: string): boolean {
	return e164PhoneRegex.test(String(value))
}

export function isChilePhoneWithDash(value: string): boolean {
	return chilePhoneWithDashRegex.test(String(value))
}

export function isLocalPhone(value: string): boolean {
	return localPhoneRegex.test(String(value))
}

export function isUsZipCode(value: string): boolean {
	return usZipCodeRegex.test(String(value))
}

export function isUrl(value: string): boolean {
	return urlRegex.test(String(value))
}

export function isStrongPassword(value: string): boolean {
	return strongPasswordRegex.test(String(value))
}

export function isMediumPassword(value: string): boolean {
	return mediumPasswordRegex.test(String(value))
}

export function isInteger(value: string): boolean {
	return integerRegex.test(String(value))
}

export function isDecimal2(value: string): boolean {
	return decimal2Regex.test(String(value))
}

export function isHexColor(value: string): boolean {
	return hexColorRegex.test(String(value))
}

export function isUuidV4(value: string): boolean {
	return uuidV4Regex.test(String(value))
}

export function isIsoDate(value: string): boolean {
	return isoDateRegex.test(String(value))
}

export function isTimeHHMM(value: string): boolean {
	return timeHHMMSRegex.test(String(value))
}

export function isCreditCard(value: string): boolean {
	return creditCardRegex.test(String(value))
}

export function isCvv(value: string): boolean {
	return cvvRegex.test(String(value))
}

export function isAlphaNumeric(value: string): boolean {
	return alphaNumericRegex.test(String(value))
}

// No exportamos por defecto; solo exportaciones nombradas (las funciones helper arriba)
