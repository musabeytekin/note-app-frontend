import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

export const useAuthContext= () => {
    const context = useContext(AuthContext);

    if(!context) throw Error('auth context not loaded');

    return context
}