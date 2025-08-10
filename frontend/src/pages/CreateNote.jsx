import React, { useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { useNavigate } from 'react-router-dom';

export default function CreateNote() {
  const { createNote } = useNotes();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await createNote({ title, body });
    nav('/');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Note</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded" required />
        <textarea value={body} onChange={e => setBody(e.target.value)} rows="10" placeholder="Write your note..." className="w-full border p-2 rounded" required />
        <div className="flex gap-2">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => nav('/')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
