import React, { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces/entry';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';


interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry}) => {
    
    const { stratDragging, endDragging } = useContext(UIContext)

    const router = useRouter()

    const onDragStart = (event: DragEvent) =>{
        //Modificar el estado para hacer drag
        event.dataTransfer.setData('text', entry._id);
        stratDragging();

    }

    const onDragEnd = (event: DragEvent) =>{
        //Cancelar el estado para hacer drag
        endDragging();

    }

    const onClick = () => {
        //validación para entrar al id de la tarea
        router.push(`/entries/${ entry._id }`);
    }

  return (
    <Card 
    onClick={ onClick }
    sx={{ marginBottom: 1 }}
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
                <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
            </CardActions>
        </CardActionArea>

    </Card>
  )
}
