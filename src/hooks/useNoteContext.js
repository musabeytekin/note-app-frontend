import { useContext } from "react";
import { NoteContext } from "../contexts/noteContext";


export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if(!context) throw new Error('context not loaded');

    return context;
};
