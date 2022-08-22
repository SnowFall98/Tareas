import { List, Paper, stepLabelClasses } from '@mui/material'
import { FC, useMemo, DragEvent } from 'react'
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces/entry';
import { useContext } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus;
}

export const EntryList:FC<Props> = ({status }) => {

  const { entries, updateEntry } = useContext (EntriesContext);

  const {isDragging, endDragging} = useContext(UIContext);

  //Memorizamos los entrys con el useMemo: useMemo(() => , []);
  //El useMemo espera una función que retorne un valor
  //posee un retorno de dependencias que indica cuando debe memorizar de nuevo ese valor y cuando no
  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ]);

  const allowDrop = (event: DragEvent<HTMLDivElement>) =>{
    //console.log (event)
    event.preventDefault()

  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {

    const id = event.dataTransfer.getData('text');
    //console.log({id})
    const entry = entries.find(e => e._id === id)!;
    entry.status = status;
    updateEntry(entry, true);
    endDragging();
    

  }
  
  return (
    <div onDrop={ onDropEntry }
    onDragOver={ allowDrop }
    className= {isDragging ? styles.dragging: ''}
    >
        <Paper sx={{height: 'calc(100vh - 150px)', overflowY:'scroll', backgroundColor:'transparent', padding: '1px 5px'}}>
            {/*Todo: Cambiará dependiendo si estoy haciendo drag o no */}
            <List sx={{opacity: isDragging ? 0.2 : 1, transition: 'all .3s'}}>

              {
                entriesByStatus.map( entry => (
                  <EntryCard key={ entry._id } entry={ entry } />
                ))
              }

            </List>

        </Paper>
    </div>
  )
}
