import { Entry } from "../interfaces";

interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry extends Omit<Entry, '_id'> {}

/*Siguiendo el tutorial de NextJS se puede hacer la conexión de la interfaz de la siguente forma

interface SeedEntry{
    description: string;
    status: string;
    createdAt: number;
}

Siendo que en typescript existen los utility types, 
y nos proporcionan maneras distintas de crear interfaces o types reutilizando código.
Documentación: https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

En este caso se puede usar Omit para reutilizar el Entry de 2 formas

type SeedEntry = Omit<Entry, '_id'>[];

interface SeedEntry extends Omit<Entry, '_id'> {}

*/




export const seedData: SeedData = {
    entries: [
        
        {
            description: 'Pendiente: Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'En-Progreso Veniam in cupidatat adipisicing Lorem sunt est est ex cillum laboris fugiat officia fugiat.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Terminadas: Commodo veniam aliqua tempor officia officia non laborum.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}