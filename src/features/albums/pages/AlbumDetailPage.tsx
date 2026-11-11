import '../albums.css'

type AlbumDetailPageProps = {
  albumId: number
}

export function AlbumDetailPage({ albumId }: AlbumDetailPageProps) {
  return (
    <main className="album-detail-page">
      <a className="company-logo" href="/" aria-label="Inicio"><img src="/favicon.ico" alt="" /></a>
      <section className="album-detail-message">
        <p className="section-kicker">ALBUM</p>
        <h1>Album {albumId}</h1>
        <p>La galeria de fotos estara disponible en una siguiente iteracion.</p>
        <a className="back-link" href="/">Volver a la comunidad</a>
      </section>
    </main>
  )
}
