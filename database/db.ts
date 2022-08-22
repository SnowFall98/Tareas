import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnection = {
    isConnected: 0
}

export const connect = async() =>{

    if(mongoConnection.isConnected ){
        console.log('Estamos conectados');
        return;
    }

    if(mongoose.connections.length > 0){
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if(mongoConnection.isConnected === 1){
            console.log('Usando anterior conexion');
            return;
        }

        await mongoose.disconnect();
    }


    await mongoose.connect(process.env.MONGO_URL || '');
    mongoConnection.isConnected =1;
    console.log('conectado a MongoDB:', process.env.MONGO_URL);
}


export const disconnect = async () => {


    //cuando estamos en desarrollo se aplica para no cerrar la DB y hacer pruebas
    if( process.env.NODE_ENV === 'development') return;
    
    
    if(mongoConnection.isConnected === 0) return;
    
    await mongoose.disconnect();
    mongoConnection.isConnected =0;
    console.log('Desconectado');

}