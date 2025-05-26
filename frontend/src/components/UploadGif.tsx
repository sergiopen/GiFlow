import { useState } from 'react'

const UploadGif = () => {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return setMessage('Selecciona un archivo GIF')

    const formData = new FormData()
    formData.append('title', title)

    tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean)
      .forEach(tag => formData.append('tags', tag))

    formData.append('gif', file)

    try {
      const res = await fetch('http://localhost:4000/api/gifs', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) throw new Error()

      const data = await res.json()
      setMessage(`GIF subido: ${data.title}`)
    } catch {
      setMessage('Error al subir el GIF')
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-5"
    >
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        placeholder="Tags separados por comas"
        value={tags}
        onChange={e => setTags(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="file"
        accept="image/gif"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="w-full text-gray-700"
      />
      <button 
        type="submit" 
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Subir GIF
      </button>
      {message && <p className="text-center text-gray-700">{message}</p>}
    </form>
  )
}

export default UploadGif
