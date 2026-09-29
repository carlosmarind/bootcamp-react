import { useParams, useSearchParams } from "react-router";
import { cursos } from "./Cursos"

export function DetalleCurso() {

    const { cursoId } = useParams();
    const [qParams] = useSearchParams();

    const color = qParams.get("color");
    const altura = qParams.get("altura");

    const cursoEncontrado = cursos.find((curso) => {
        if (curso.id === cursoId) {
            return curso;
        }
    });

    if (!cursoEncontrado) {
        return (
            <section>
                <h1>Curso no encontrado</h1>
                <p>No tenemos un curso con el identificador "{cursoId}"</p>
                <a href="/cursos">Volver a los cursos</a>
            </section>
        )
    }

    const { titulo, horario, sala = "Sala por confirmar", tieneCupos } = cursoEncontrado;

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
                <p>Altura: {altura}, color: {color}</p>
                <p className={tieneCupos ? "badge" : "badge badge-muted"}>{tieneCupos ? "Hay Cupos" : "Completo"}</p>
            </section>
        </>
    )
}