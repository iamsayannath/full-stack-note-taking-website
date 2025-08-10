import React, { createContext, useContext, useEffect, useState } from 'react';
import { notesAPI } from '../api';
import { useAuth } from './AuthContext';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);

  const fetchNotes = async (q = '') => {
    if (!user) { setNotes([]); return; }
    setLoadingNotes(true);
    try {
      const data = await notesAPI.list(q);
      setNotes(data);
    } catch (err) { console.error(err); }
    setLoadingNotes(false);
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  const createNote = async (payload) => {
    const note = await notesAPI.create(payload);
    setNotes(prev => [note, ...prev]);
    return note;
  };

  const updateNote = async (id, payload) => {
    const note = await notesAPI.update(id, payload);
    setNotes(prev => prev.map(n => n._id === id ? note : n));
    return note;
  };

  const deleteNote = async (id) => {
    await notesAPI.remove(id);
    setNotes(prev => prev.filter(n => n._id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, loadingNotes, fetchNotes, createNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
