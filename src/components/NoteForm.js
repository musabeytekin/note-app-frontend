import React, { useState } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const { dispatch } = useNoteContext();
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("you must login");
      return
    }
    const note = { title, content };
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer: ${user.token}`
      }
    });

    const json = await res.json();

    if (res.ok) {
      setError(null);
      setTitle("");
      setContent("");
      dispatch({ type: "CREATE_NOTE", payload: json.data });
    }
    if (!res.ok) setError(json.message);
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add A New Note</h3>
      <div className="create-group">
        <div>
          <label>Note Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label>Note Content</label>
          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
      </div>
      <button type="submit">EKLE</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
