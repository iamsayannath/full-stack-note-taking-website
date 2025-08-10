import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { notesAPI } from '../api';
import { useNotes } from '../contexts/NotesContext';

export default function ViewNote() {
  const { id } = useParams();
  const nav = useNavigate();
  const { deleteNote } = useNotes();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await notesAPI.get(id);
        setNote(res);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    load();
  }, [id]);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${note.title}\n\n${note.body}`);
      alert('Copied to clipboard');
    } catch {
      alert('Copy failed');
    }
  };

  const doShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: note.title, text: note.body });
      } else {
        await navigator.clipboard.writeText(`${note.title}\n\n${note.body}`);
        alert('Sharing not supported: copied to clipboard instead');
      }
    } catch (err) {
      console.log(err);

      alert('Share failed');
    }
  };

  const doDelete = async () => {
    if (!confirm('Delete this note?')) return;
    await deleteNote(id);
    nav('/');
  };

  if (loading) return <div>Loading...</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{note.title}</h1>
          <p className="text-sm text-gray-500">{new Date(note.datetime).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={doCopy} className="px-3 py-1 border rounded">Copy</button>
          <button onClick={doShare} className="px-3 py-1 border rounded">Share</button>
          <Link to={`/edit/${note._id}`} className="px-3 py-1 border rounded">Edit</Link>
          <button onClick={doDelete} className="px-3 py-1 border rounded text-red-600">Delete</button>
        </div>
      </div>

      <div className="mt-4 whitespace-pre-wrap">{note.body}</div>
    </div>
  );
}
