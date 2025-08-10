import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { notesAPI } from '../api';
import { useNotes } from '../contexts/NotesContext';

export default function EditNote() {
  const { id } = useParams();
  const nav = useNavigate();
  const { updateNote } = useNotes();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await notesAPI.get(id);
        setTitle(res.title);
        setBody(res.body);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await updateNote(id, { title, body });
    nav('/');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded" required />
        <textarea value={body} onChange={e => setBody(e.target.value)} rows="10" placeholder="Write your note..." className="w-full border p-2 rounded" required />
        <div className="flex gap-2">
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
          <button type="button" onClick={() => nav('/')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
