import NoteItem from './NoteItem';

const NoteList = ({ notes, onDeleteNote }) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes yet. Add your first note above! 📝</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onDeleteNote={onDeleteNote} 
        />
      ))}
    </div>
  );
};

export default NoteList;
