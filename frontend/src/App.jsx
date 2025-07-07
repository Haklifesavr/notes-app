import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

const API_URL = 'http://localhost:8000/api/notes/';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch notes from API
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setNotes(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch notes. Make sure the backend server is running.');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new note
  const addNote = async (noteData) => {
    try {
      const response = await axios.post(API_URL, noteData);
      setNotes([response.data, ...notes]);
      setError('');
      return true;
    } catch (err) {
      setError('Failed to add note. Please try again.');
      console.error('Error adding note:', err);
      return false;
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setNotes(notes.filter(note => note.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete note. Please try again.');
      console.error('Error deleting note:', err);
    }
  };

  // Load notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📝 My Notes App</h1>
          <p>Keep track of your thoughts and ideas</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="main-content">
          <div className="form-section">
            <NoteForm onAddNote={addNote} />
          </div>

          <div className="notes-section">
            <h2>Your Notes ({notes.length})</h2>
            {loading ? (
              <div className="loading">Loading notes...</div>
            ) : (
              <NoteList notes={notes} onDeleteNote={deleteNote} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
