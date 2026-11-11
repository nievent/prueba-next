import type { AlbumPreview } from '../types/album'
import { AlbumCard } from './AlbumCard'

type AlbumListProps = {
  albums: AlbumPreview[]
}

export function AlbumList({ albums }: AlbumListProps) {
  return (
    <div className="album-grid">
      {albums.map((album) => <AlbumCard key={album.id} album={album} />)}
    </div>
  )
}
