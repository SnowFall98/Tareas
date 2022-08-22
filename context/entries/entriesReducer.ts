import { Entry } from '../../interfaces';
import { EntriesState } from './';


type EntriesActionType = 
   | { type: '[Entry] Add-Entry', payload: Entry} 
   | { type: '[Entry] Entry-Updated', payload: Entry  } 
   | { type: '[Entry] Refresh-Data', payload: Entry[] } 
   | { type: '[Entry] - Entry-Deleted', payload: Entry }


export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

   switch (action.type) {

      case '[Entry] Add-Entry':
         return {
            ...state,
            entries: [ ...state.entries, action.payload ]
         }
      case '[Entry] Entry-Updated':
         return {
            ...state,
            entries: state.entries.map( entry => { //mapeo el arreglo 
              if ( entry._id === action.payload._id ) { //Si los elementos coinciden
                 entry.status = action.payload.status;//Cambio status a nuevo panel de acción
                 entry.description = action.payload.description; //Cambio la descripcion
              }
              return entry;
            })
         }
      case '[Entry] Refresh-Data':
         return{
            ...state,
            entries: [...action.payload]
         }
      case '[Entry] - Entry-Deleted':
         return{
            ...state,
            entries: state.entries.filter( entry => entry._id !== action.payload._id ) //Filtro el ID que necesito para poder eliminarlo
         }
        
       default:
          return state;
   }

}