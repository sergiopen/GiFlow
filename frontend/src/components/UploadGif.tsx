import { useState } from 'react';
import { uploadGif } from '../services/gifService';

export const UploadGif = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage('El título es obligatorio');
      return;
    }

    if (!file) {
      setMessage('Selecciona un archivo GIF');
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());

    const tagList = tags.includes(',')
      ? tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
      : [tags.trim()].filter(Boolean);

    tagList.forEach((tag) => formData.append('tags', tag));
    formData.append('gif', file);

    try {
      const data = await uploadGif(formData);
      setMessage(`GIF subido: ${data.title}`);
      setTitle('');
      setTags('');
      setFile(null);
      setPreviewUrl(null);
    } catch {
      setMessage('Error al subir el GIF');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setPreviewUrl(selected ? URL.createObjectURL(selected) : null);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-5">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        id="form-input1"
      />
      <input
        type="text"
        placeholder="Tags separados por comas"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        id="form-input2"
      />
      <input type="file" accept="image/gif" onChange={handleFileChange} className="w-full text-gray-700" />

      {previewUrl && (
        <div className="w-full border rounded overflow-hidden">
          <img src={previewUrl} alt="Vista previa" className="w-full h-auto" />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Subir GIF
      </button>
      {message && <p className="text-center text-red-500">{message}</p>}
    </form>
  );
};

export default UploadGif;
