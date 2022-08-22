import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from "../../interfaces";
import { dateFunctions } from '../../utils';
import { useRouter } from 'next/router'; ///// esto modificado


const validStatus: EntryStatus[] = ['pending', 'in-progress','finished'];


interface Props {
    entry: Entry
}

export const EntryPage:FC<Props> = ({ entry }) => {

    //siempre tengo esta entry, sino el mismo getServerSideProps me redireccionaria para el home

    const router = useRouter();// Enrutamiento
 
    const { updateEntry, deleteEntry } = useContext(EntriesContext) // Traigo las funciones

    const [inputValue, setInputValue] = useState( entry.description ); //validación de campo input vacio
    const [status, setStatus] = useState<EntryStatus>( entry.status ); //validación estado
    const [touched, setTouched] = useState(false); //Validar campo de texto al solo clickear

    //se verifica que los campos si estén llenos
    const isNotValid =  useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);


    const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        //se captura el evento y se valida que se haya ejecutado
        setInputValue( event.target.value );
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        //se captura el evento y se valida que se haya ejecutado
        setStatus( event.target.value as EntryStatus );
    }

    const onSave = () => {
        //Guardar la data cuando se validen los campos
        if ( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry( updatedEntry, true );
    }
    
    const onDelete = () => {
        //Eliminar la entrada
        deleteEntry( entry, true );
        router.push('/')
    }


  return (

    <Layout title={ inputValue.substring(0,20) + '...' }>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                <Card>
                    <CardHeader 
                        title={`Entrada:`}
                        subheader={`Creada ${ dateFunctions.getFormatDistanceToNow( entry.createdAt) }`}
                    />

                    <CardContent>
                        <TextField 
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            fullWidth
                            placeholder="Nueva entrada"
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            value={ inputValue }
                            onBlur={ () => setTouched( true) }
                            onChange={ onInputValueChanged }
                            helperText={ isNotValid && 'Ingrese un valor' }
                            error={ isNotValid }
                        />

                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row
                                value={ status }
                                onChange={ onStatusChanged }
                            >
                                {
                                    validStatus.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={ <SaveOutlinedIcon /> }
                            variant="contained"
                            fullWidth
                            onClick={ onSave }
                            disabled={ inputValue.length <= 0  }
                        >
                            Save
                        </Button>
                    </CardActions>

                </Card>

            </Grid>

        </Grid>


        <IconButton
        onClick= { onDelete }
         sx={{
            position:'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark',
        }}>
            <DeleteOutlinedIcon />
        </IconButton>


    </Layout>

  );
};



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { id } = params as { id: string }; //Obtener el id
    
    const entry = await dbEntries.getEntryById( id ); //entrada de la db y obtencion de id

    //Validación de ID, si no existe, retorno al home

    if ( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry // se retornan los valores del ID
        }
    }
}


export default EntryPage;