import { React, useEffect } from "react";
import NoteDetails from "../components/NoteDetails";
import NoteForm from "../components/NoteForm";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from '../hooks/useAuthContext';
export default function Home() {
  // const [notes, setNotes] = useState(null);
  const { notes, dispatch } = useNoteContext();
  const {user} = useAuthContext()
  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/api/notes", {
        headers: {
          Authorization: `Bearer: ${user.token}`
        }
      });
      const json = await res.json();
      console.log("json data ",  json.data)
      if (res.ok) dispatch({ type: "FILL_NOTE", payload: json.data });
    };
    if(user) fetchNotes();
    
  }, [dispatch, user]);
  return (
    <div className="home">
      <div className="note-form">
        <NoteForm />
      </div>
      <div className="notes">
        {notes && console.log("mappingnotes", notes)}
        {notes && 
          notes.map((note) => <NoteDetails key={note._id} note={note} />)}
      </div>
    </div>
  );
}
