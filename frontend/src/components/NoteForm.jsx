import { useState } from 'react';

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    setIsSubmitting(true);
    
    const noteData = {
      title: title.trim(),
      description: description.trim()
    };

    const success = await onAddNote(noteData);
    
    if (success) {
      setTitle('');
      setDescription('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="note-form">
      <h2>Add New Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            disabled={isSubmitting}
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter note description..."
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
