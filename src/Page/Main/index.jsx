import React from 'react';
import Contenedor from '../../components/Contenedor'
import Users from '../../components/Users';
import FiltroBusqueda from '../../components/FiltroBusqueda'
// context
import { ModalUserContextProvider } from '../../useContext/modalsContext'




const index = () => {
  return (
    <main>
      <Contenedor/>
      <ModalUserContextProvider>
        <FiltroBusqueda/>
        <Users/>
      </ModalUserContextProvider>
    </main>
  )
}

export default index
