import {createContext, useReducer} from 'react';

export const NoteContext = createContext();

export const noteReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            return {
                notes:[action.payload, ...state.notes]
            }
        case 'FILL_NOTE':
            return {
                notes: action.payload
            }
        case 'DELETE_NOTE':
            return {
                notes: state.notes.filter((n) => n._id!==action.payload._id)
            }
        default:
            return state
    }
}

export const NoteContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(noteReducer, {
        notes: null
    })
    return (
        <NoteContext.Provider value={{...state, dispatch}}>
            {children}
        </NoteContext.Provider>
    )
}