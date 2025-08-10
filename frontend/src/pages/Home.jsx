import React, { useEffect, useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import NoteCard from '../components/NoteCard';
import Loading from '../components/Loading';

export default function Home() {
  const { notes, loadingNotes, fetchNotes, deleteNote } = useNotes();
  const [q, setQ] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => fetchNotes(q), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div>
      <div className="mb-4 flex gap-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by title..." className="flex-1 border p-2 rounded" />
      </div>

      {loadingNotes ? <Loading /> : (
        notes.length === 0 ? (
          <div className="text-center text-gray-600">No notes yet. Create one!</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {notes.map(n => <NoteCard key={n._id} note={n} onDelete={async (id) => {
              if (!confirm('Delete this note?')) return;
              await deleteNote(id);
            }} />)}
          </div>
        )
      )}
    </div>
  );
}
