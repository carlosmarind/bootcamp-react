import { cursos } from "./Cursos"

export function DetalleCurso() {

    const curso = cursos[0];

    const { titulo, horario, sala = "Sala por confirmar", tieneCupos } = curso;

    return (
        <>
            <header className="chapter-header">
                <p className="eyebrow">Detalle del curso</p>
                <h1>{titulo}</h1>
                <p className="lead">Estos datos pertenecen al detalle de producto que se llama para llegar aca en la url</p>
            </header>
            <section className="card">
                <p>Horario: {horario}</p>
                <p>Sala: {sala}</p>
                <p className={tieneCupos ? "badge" : "badge badge-muted"}>{tieneCupos ? "Hay Cupos" : "Completo"}</p>
            </section>
        </>

    )
}