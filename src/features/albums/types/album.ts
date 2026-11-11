export type Album = {
  id: number
  userId: number
  title: string
}

export type AlbumPreview = Album & {
  thumbnailUrl: string | null
}
