// Cualquier caracter a-Z y A-Z, numeros 0-9 y _ antes del arroba, 
// luego lo mismo con punto, y al final caracters A-Z y a-Z minimo 2 maximo 3
const regCorreo = /^[a-zA-Z.0-9_]+@([a-zA-Z-]+\.)+[A-Za-z]{2,3}$/;

//largo minimo 3 maximo 16
const regNombre = /^[a-zA-Z\s]{3,16}$/;

// validacion telefono
// formato: 569-123456782134243242342342342342343453453453453453a
const regTelefono = /^56[0-9]-[0-9]{8}$/;

export { regCorreo, regNombre, regTelefono }