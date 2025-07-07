import { useState } from 'react';

const NoteItem = ({ note, onDeleteNote }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true);
      await onDeleteNote(note.id);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="note-item">
      <div className="note-content">
        <h3 className="note-title">{note.title}</h3>
        <p className="note-description">{note.description}</p>
        <div className="note-meta">
          <span className="note-date">
            Created: {formatDate(note.created_at)}
          </span>
          {note.updated_at !== note.created_at && (
            <span className="note-date">
              Updated: {formatDate(note.updated_at)}
            </span>
          )}
        </div>
      </div>
      
      <div className="note-actions">
        <button 
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : '🗑️ Delete'}
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
