type UserSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <label className="people-search">
      <span className="search-symbol" aria-hidden="true" />
      <input
        aria-label="Buscar personas"
        placeholder="Buscar personas..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && <button type="button" className="clear-button" aria-label="Limpiar búsqueda" onClick={() => onChange('')}><span aria-hidden="true">×</span></button>}
    </label>
  )
}
