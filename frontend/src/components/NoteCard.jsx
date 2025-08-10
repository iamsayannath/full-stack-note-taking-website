import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteCard({ note, onDelete }) {
  const dt = new Date(note.datetime || note.createdAt);
  return (
    <div className="bg-white p-4 rounded shadow-sm border">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <p className="text-sm text-gray-500">{dt.toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/note/${note._id}`} className="text-indigo-600">View</Link>
          <Link to={`/edit/${note._id}`} className="text-yellow-600">Edit</Link>
          <button onClick={() => onDelete(note._id)} className="text-red-600">Delete</button>
        </div>
      </div>
      <p className="mt-3 text-sm whitespace-pre-wrap">{note.body.slice(0, 220)}{note.body.length > 220 ? '...' : ''}</p>
    </div>
  );
}
