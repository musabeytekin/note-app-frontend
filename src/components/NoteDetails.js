import React from "react";
import { useNoteContext } from "../hooks/useNoteContext";
import moment from "moment";
import { useAuthContext } from "../hooks/useAuthContext";

export default function NoteDetails({ note }) {
  const { dispatch } = useNoteContext();
  const { user } = useAuthContext();

  if (!user) {
    return;
  }
  const handleClick = async () => {
    const res = await fetch("/api/notes/" + note._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer: ${user.token}`
      }
    });

    const json = await res.json();

    if (res.ok) dispatch({ type: "DELETE_NOTE", payload: json.data }); // remove from state;
  };

  return (
    <div className="note-details">
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <p>{moment(new Date(note.createdAt)).fromNow()}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}
