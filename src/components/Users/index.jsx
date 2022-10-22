import React, { useContext } from 'react'
import './users.css'
import TableUsers from '../TableUsers'
import AgregarUsuario from '../AgregarUsuario'
// useContext import
import ModalUserContext from '../../useContext/modalsContext.jsx'






const index = () => {
  // redux
  // useContext
  const {openCloseAdd, setOpenCloseAdd} = useContext(ModalUserContext);

  //funcion modificadora abrir modal nuevo usuario
  const handleClickOpen = () => {
    setOpenCloseAdd(!openCloseAdd);
  }

  return (
    <section className="usuarios">

      <div className="fila--1">
        <h3>Usuarios</h3>
        <div className="usuarios__container-buttons">
          {/* este boton abrira el modal */}
          <button className="agregar" onClick={handleClickOpen}>
            Agregar Usuario
          </button>
          <button className="export">Export</button>
        </div>
      </div>

      <hr size="8px" />

      <div className="fila--2">
        <div className="usuarios__ver">
          <span>ver</span>
          <span className="diez"> 10 </span>
        </div>
        <div className="usuarios__buscar">
          <label className="usuarios__buscar-label" >Buscar</label>
          <input type="text" placeholder="Buscar"/>
        </div>
      </div>

      <div className="fila--4">
        <TableUsers/>
      </div>

      {/* modal con condicional para abrir */}
      { openCloseAdd && <AgregarUsuario/> }

      
    </section>
  )
}

export default index
