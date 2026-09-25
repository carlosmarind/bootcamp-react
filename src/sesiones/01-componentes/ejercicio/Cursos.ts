export type Curso = {
    id: string
    titulo: string
    horario: string
    sala?: string
    tieneCupos: boolean
}

export const cursos: Curso[] = [
    {id: "react", titulo:"Introduccion a React", horario: "09:00", sala: "Sala 1", tieneCupos: true},
    {id: "javascript", titulo: "javascript", horario : "10:30", tieneCupos:true},
    {id: "html-css", titulo: "HTML y CSS", horario: "12:00", sala: "Sala 2", tieneCupos: false}
]