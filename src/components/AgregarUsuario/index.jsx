import React, { useState, useContext } from 'react'
import './agregar.css'
// hook form
import { useForm } from "react-hook-form";
// useContext
import ModalUserContext from '../../useContext/modalsContext'

const index = () => {
  // cerrar modal
  const {openCloseAdd, setOpenCloseAdd} = useContext(ModalUserContext);
  const handleClickClose = () => {
    // Swal.fire({
    //   title: 'Do you want to save the changes?',
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Save',
    //   denyButtonText: `Don't save`,
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     Swal.fire('Saved!', '', 'success')
    //   } else if (result.isDenied) {
    //     Swal.fire('Changes are not saved', '', 'info')
    //   }
    // })
    setOpenCloseAdd(!openCloseAdd)
  }
  // uso hook
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // funcion que crea usuario en DB
  const onSubmit = async (data) => {
    try{
      const response = await fetch('http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/1026146629/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "name": data.name,
          "email": data.email,
          "profile": data.profile
        })
      })
    }catch(e){
      setError('service',{message:'algo salio mal!'})
    }
    console.log(data);
  };

  console.log(watch("example")); 

  return (
    <section className='agregar__container'>

      <div className="agregarUsuarios__container-title">
        <h3>Agregar Nuevo Usuario</h3>
        {/* click aqui debe cerrar el modal agregar */}
        <i className="fa-solid fa-xmark" onClick={handleClickClose} style={{cursor: 'pointer'}}></i>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formulario__agregarUsuarios">

          {/* item 1 nombre */}
          <div className="formulario__agregarUsuarios--item">
            <label htmlFor="name">Nombre Completo</label>
            <input type="text" {...register("name",{ 
              required: true,
              minLength: 6,
              pattern: /^[a-zA-ZÀ-ÿ\s]{8,40}$/,
            })} 
            
          />
            {errors.name?.type === 'required' && <span className="error" >Este Campo es requerido</span>}
            {errors.name?.type === 'minLength' && <span className="error" >debe ser minimo 6 caracteres</span>}
          </div>

          {/* item 2 correo electronico */}
          <div className="formulario__agregarUsuarios--item">
            <label htmlFor="email">Correo Electronico</label>
            <input type="email" {...register("email",{ 
              required: true,
              pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            })} />
            {errors.email?.type === 'required' && <span className="error" >este campo es requerido</span>}
            {errors.email?.type === 'pattern' && <span className="error" >esto no es un correo valido</span>}
          </div>
  
          {/* item 3 peerfil */}
          <div className="formulario__agregarUsuarios--item">
            <label htmlFor="profile">Perfil</label>
            <select {...register("profile")}>
              <option value="0" /**disabled */>Selecciona un campo</option>
              <option value="1" >Practicante</option>
              <option value="2">Desarrollador</option>
              <option value="3">Vendedor</option>
              <option value="4">Administrador</option>
            </select>
          </div>

          {/* buttons */}
          <div className="agregarUsuarios__container-buttons">
            <button className="agregar" onClick={()=>handleSubmit(onSubmit)}>Agregar</button>
            <button className="cancel" onClick={handleClickClose}>Cancelar</button>
          </div>

        </div>
      </form>
    </section>
  );

}

export default index