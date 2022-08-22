import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
//import { v4 as uuidv4 } from 'uuid';
import entriesApi from '../../apis/entriesApi';
import { useSnackbar } from 'notistack';

export interface EntriesState {
    entries: Entry[]; // Estado
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider:FC<PropsWithChildren> = ({ children }) => {

    const { enqueueSnackbar } = useSnackbar();

    const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );

    const addNewEntry = async( description: string ) => {

        const { data } = await entriesApi.post<Entry>('/entries', {description});
        /* 
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        } */
        dispatch({ type: '[Entry] Add-Entry', payload: data });
    }

    /*
    Para añadir la animación de actualización, cambiar la siguiente línea por esta
    const updateEntry = async({ _id, description, status }: Entry) =>{ 
     */
    const updateEntry = async({ _id, description, status }: Entry, showSnackbar = false) =>{

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });
            dispatch({ type: '[Entry] Entry-Updated', payload: data})

            //Y se comentar la siguiente condicional
            if(showSnackbar)

            enqueueSnackbar('Entrada actualizada', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }

            })
            
        } catch (error) {
            console.log({error})
            
        }
        
    }

    const refreshEntries = async () =>{
        const {data} = await entriesApi.get<Entry[]>('/entries');
        dispatch({type: '[Entry] Refresh-Data', payload: data});
        
    }

    const deleteEntry = async (entry:Entry, showSnackbar = false) =>{

        try {

            const { data } = await entriesApi.delete<Entry>(`/entries/${entry._id}`);

            dispatch({ type: '[Entry] - Entry-Deleted', payload: data });

            if(showSnackbar)

                enqueueSnackbar('Tarea eliminada con éxito', {
                    variant: 'info',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }

                })
        } catch (error) {
            console.log({error})
            
        }

    }

    useEffect(() => {
        refreshEntries();
    }, [])
    

    return (
        <EntriesContext.Provider value={{
            ...state,

            //Metodos CRUD
            addNewEntry,
            updateEntry,
            deleteEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
};