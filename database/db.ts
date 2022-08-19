import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongooConnection = {
    isConnected: 0
}

export const connect = async() =>{

    if(mongooConnection.isConnected ){
        console.log('Estamos conectados');
        return;
    }

    if(mongoose.connections.length > 0){
        mongooConnection.isConnected = mongoose.connections[0].readyState;

        if(mongooConnection.isConnected === 1){
            console.log('Usando anterior conexion');
            return;
        }

        await mongoose.disconnect();
    }


    await mongoose.connect(process.env.MONGO_URL || '');
    mongooConnection.isConnected =1;
    console.log('conectado a MongoDB:', process.env.MONGO_URL);
}


export const disconnect = async () => {


    //cuando estamos en desarrollo se aplica para no cerrar la DB y hacer pruebas
    if( process.env.NODE_ENV === 'development') return;
    
    
    if(mongooConnection.isConnected === 0) return;
    
    await mongoose.disconnect();
    mongooConnection.isConnected =0;
    console.log('Desconectado');

}