import React, { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui/UIContext';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry}) => {
    
    const { stratDragging, endDragging } = useContext(UIContext)

    const onDragStart = (event: DragEvent) =>{
        //Modificar el estado para hacer drag
        event.dataTransfer.setData('text', entry._id);
        stratDragging();

    }

    const onDragEnd = (event: DragEvent) =>{
        //Cancelar el estado para hacer drag
        endDragging();

    }

  return (
    <Card sx={{ marginBottom: 1 }}
    // Eventos de drag
    draggable
    onDragStart={ onDragStart }
    onDragEnd={ onDragEnd }
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                <Typography variant='body2'>hace 30 minutos</Typography>
            </CardActions>
        </CardActionArea>

    </Card>
  )
}
