import React, { useState, useContext } from 'react'
import './filtro.css'
// hook form
import ModalUserContext from '../../useContext/modalsContext'



const index = () => {

  const { search, setSearch } = useContext(ModalUserContext);
  const {searchEmail, setSearchEmail} = useContext(ModalUserContext);

  const cleanUp = () => {
    setSearch('');
    setSearchEmail('');
  }

  const handleChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSearch(e.target.value);
    console.log(e.target.value);
  }
  const handleChangeEmail = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSearchEmail(e.target.value);
    console.log(e.target.value);
  }

  const entregaFiltro = (userFilterName) => {
    if(userFilterName.length = 1){
      Swal.fire({
        icon: 'success',
        title: 'Estos son los resultados encontrados',
        text: `los datos del usuario son: ${userFilterName.name}, su correo es:${userFilterName.email} tiene un perfil de 
        ${
          userFilterName.profile == 1 ? 'Administrador' 
          : userFilterName.profile == 2 ? 'Autor'
          : userFilterName.profile == 3 ? 'Diseñador'
          : userFilterName.profile == 4 ? 'Editor'
          : userFilterName.profile == 5 ? 'Mantenimiento'
          : 'Suscriptor'
        } 
          y su estado actual es ${userFilterName.state}`,
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    };
  }

  // metodo de filtrado
  const fetchFilter = async (e) => {
    e.preventDefault();
    const response = await fetch('http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/1026146629/users/index');
    const data = await response.json();
    const user = data.users;
    const resultFilter = user.filter((element)=>{
      if(element.name.toString().toLowerCase().includes(search.toLowerCase())){
        return element;
      }
    });
    const resultFilterWithEmail = resultFilter.filter((element)=>{
      if(element.email.toString().toLowerCase().includes(searchEmail.toLowerCase())){
        return element;
      }
    })
    console.log(resultFilterWithEmail);
    entregaFiltro(resultFilterWithEmail[0]);
    // setSearch('');
    // setSearchEmail('');
  }

  return (
    <section className="filtroUsuarios">
      <div className="filtroUsuarios__container-title">
        <h3>Filtros de Búsqueda</h3>
        <button
          onClick={cleanUp}
        >Limpiar Filtros</button>
      </div>

      <form onSubmit={fetchFilter}>
        <div className="formulario__filtroUsuarios">
          
          <div className="formulario__filtroUsuarios--item">
            <label htmlFor="">Nombre</label>
            <input 
              type="search" placeholder="buscar" name="name"
              value={search} onChange={handleChange}
            />
          </div>

          <div className="formulario__filtroUsuarios--item">
            <label htmlFor="">Correo Electronico</label>
            <input 
              type="search" placeholder="Correo Electronico"
              name="email" 
              value={searchEmail} onChange={handleChangeEmail}
              id="email"
            />
          </div>

          {/* selection */}
          <div className="formulario__filtroUsuarios--item">
            <label htmlFor="">Perfil</label>
            <select name="perfil" type="select" className="formulario__select" placeholder="Perfil">
              <option value="" className="defauld">Administrador</option>
              <option value="" className="defauld">Autor</option>
              <option value="" className="defauld">Diesñador</option>
              <option value="" className="defauld">Editor</option>
              <option value="" className="defauld">Mantenimiento</option>
              <option value="" className="defauld">Suscriptor</option>
            </select>
          </div>

          <div className="formulario__filtroUsuarios--item">
            <label htmlFor="">Estado</label>
            <select name="estado" type="select" className="formulario__select" placeholder="Estado">
              <option value="" className="defauld">Activo</option>
              <option value="" className="defauld">Inactivo</option>
            </select>
          </div>

        </div>
        <button className="button__filter-search" onClick={()=>fetchFilter}>
          Buscar Usuario
        </button>
      </form>
      

    </section>
  )
}

export default index
