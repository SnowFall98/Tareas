import { Box } from '@mui/system'
import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { Navbar, Sidebar } from '../ui';

/*Cuando definimos los CHILDREN se definia con los FC de react,
pero en la nueva versión de REACT 18 esto se sacó y según la documentación
se soluciona de la siguiente manera:
1. en interface copiar lo siguiente: extends PropsWithChildren<{}>
2. en los valores de interface: children?: React.ReactNode*/

interface Props extends PropsWithChildren<{}> {
    title?: string;
}

export const Layout:FC<Props> = ({title = 'OpenJira', children}) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{ title }</title>
      </Head>

      <Navbar />
      <Sidebar />

      <Box sx={{ padding: '10px 20px'  }}>
        { children }
      </Box>
    </Box>
  )
}