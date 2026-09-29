export function EjemploBrowserRouter() {
  return (
    <section className="lesson" id="router-browser" aria-labelledby="router-browser-title">
      <header className="lesson-heading">
        <span className="lesson-number">02</span><h2 id="router-browser-title">Activar el router una sola vez</h2>
      </header>
      <p>Instalamos <code>react-router</code> y envolvemos la aplicación con <code>BrowserRouter</code> en <code>main.tsx</code>. Así los componentes pueden usar la dirección y el historial del navegador.</p>
      <pre><code>{'pnpm add react-router@8.4.0'}</code></pre>
      <pre><code>{'// Dentro del render de main.tsx:\n<StrictMode>\n  <BrowserRouter>\n    <App />\n  </BrowserRouter>\n</StrictMode>\n\n// BrowserRouter se importa desde "react-router".'}</code></pre>
      <p>Esto se parece a la composición que practicamos con children: colocamos App entre las etiquetas de otro componente. Las páginas no necesitan otro BrowserRouter dentro.</p>
      <p className="prompt">Busca BrowserRouter en main.tsx. ¿Qué partes de la aplicación quedan dentro de él?</p>
    </section>
  )
}
