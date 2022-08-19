import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'

type Data = {
    message: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    if(process.env.NODE_ENV ==='production'){
        return res.status(401).json({message:'No tiene acceso a este servicio'})
    }

    await db.connect();
    await Entry.deleteMany(); //Precaución porque puede eliminar TODA LA COLECCIÓN DE DB
    await Entry.insertMany(seedData.entries); //Permite restaurar la data que tengamos hecha en seed-Data.ts
    await db.disconnect();


    res.status(200).json({ message: 'Proceso realizado correctamente' })
}