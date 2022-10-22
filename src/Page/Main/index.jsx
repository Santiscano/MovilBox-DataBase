import React from 'react';
import Contenedor from '../../components/Contenedor'
import Users from '../../components/Users';
// context
import { ModalUserContextProvider } from '../../useContext/modalsContext'




const index = () => {
  return (
    <main>
      <Contenedor/>
      <ModalUserContextProvider>
        {/* <FiltroBusqueda/> */}
        <Users/>
      </ModalUserContextProvider>
    </main>
  )
}

export default index
