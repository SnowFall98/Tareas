import { createContext } from 'react';
import { Entry } from '../../interfaces/entry';

interface ContextProps {
    entries: Entry[]; //Contexto que exporta y expone a sus hijos

    //Metodos
    addNewEntry: (description:string) => void;
    updateEntry: (entry: Entry) => void;

}

export const EntriesContext = createContext({} as ContextProps );