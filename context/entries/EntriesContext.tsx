import { createContext } from 'react';
import { Entry } from '../../interfaces/entry';

interface ContextProps {
    entries: Entry[]; //Contexto que exporta y expone a sus hijos

    //Metodos CRUD
    addNewEntry: (description:string) => void;
    updateEntry: (entry: Entry, showSnackbar: boolean) => void;
    deleteEntry: (entry: Entry, showSnackbar: boolean) => void;


}

export const EntriesContext = createContext({} as ContextProps );