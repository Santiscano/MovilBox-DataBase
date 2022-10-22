import React, { useState, useContext } from 'react'
import './agregar.css'
import { Formik, Field  } from 'formik'
// useContext
import ModalUserContext from '../../useContext/modalsContext'
// gallery pops


const index = () => {

  const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{8,40}$/, 
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  }

  const [enviado, setEnviado] = useState(false);

  // useContext
  const {openCloseAdd, setOpenCloseAdd} = useContext(ModalUserContext);

  // funcion modificadora cierra modal
  const handleClickClose = () => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

    setOpenCloseAdd(!openCloseAdd);
  }


  const handleSearchClick = async () => {
    try{
      setisLoading(true);
      FetchCreateUser() //ejecuto la peticion
    }catch(error) {
      seterror(error)
    }finally{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      setisLoading(false)
    }
  }


  // peticion post
  const handleSubmit = async () => {
    const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: `{"name": "${values.name}", "email": "${values.email}", "profile":"${values.value}"}`
    };
    try{
    const peticion = await fetch('http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/1026146629/users', options);
    const response = await peticion.json();
    const data = await response;
    console.log(data);
    }catch{
      console.error(err);
    }
    
  }

  return (
    <section className='agregar__container'>
      <div className="agregarUsuarios__container-title">
        <h3>Agregar Nuevo Usuario</h3>
        {/* click aqui debe cerrar el modal agregar */}
        <i className="fa-solid fa-xmark" onClick={handleClickClose}  style={{cursor: 'pointer'}}></i>
      </div>
      <Formik
        initialValues={{ name:'', email: '' }}
        validate={values => { 
          const errors = {};
          // nombre
          if(!values.name){
            errors.name = 'por favor ingrese su nombre'
          }else if(!expresiones.name.test(values.name)){
            errors.name = 'nombre incompleto o invalido'
          }
          // email
          if(!values.email){
            errors.email = 'por favor ingrese su correo'
          }else if(!expresiones.email.test(values.email)){
            errors.email = 'email invalido'
          }
          return errors;
        }}
        onSubmit={(values, {resetForm}) =>{
          e.preventDefault();
          // envia informacion a la base de datos
          console.log('estamos enviando formulario');
          // peticion post
          handleSubmit();
          // limpia
          resetForm();
          // confirma envio
          setEnviado(true);
          // limpia confirmacion
          setTimeout(()=>{
            setEnviado(false);
          }, 8000)
        }}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) =>(
        <form>
          <div className="formulario__agregarUsuarios">
            <div className="formulario__agregarUsuarios--item">
              <label htmlFor="">Nombre</label>
              <input 
                type="text" 
                name="name"
                placeholder="Nombre de Usuario" 
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="formulario__agregarUsuarios--item">
              <label htmlFor="">Correo Electronico</label>
              <input 
                type="email"
                name="email"
                placeholder="Correo Electronico"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && <div className="error">{errors.email}</div>}
            </div>

            {/* selection */}
            <div className="formulario__agregarUsuarios--item">
              <label htmlFor="">Perfil</label>
              <Field name="perfil" as="select" className="formulario__select" placeholder="Perfil">
                <option value="1" className="defauld">Administrador</option>
                <option value="2" className="defauld">Autor</option>
                <option value="3" className="defauld">Diseñador</option>
                <option value="4" className="defauld">Editor</option>
                <option value="5" className="defauld">Mantenimiento</option>
                <option value="6" className="defauld">Suscriptor</option>
              </Field>
            </div>

            <div className="agregarUsuarios__container-buttons">
              <button className="agregar" onClick={handleSearchClick}>Agregar</button>
              <button className="cancel" onClick={handleClickClose} >Cancelar</button>
              { touched && !openCloseAdd && console.log('seguro quiere salirse?') }
            </div>
          </div>
          {/* boton que esta fuera debe activar este form */}
          { enviado && <p className="exito">Registro enviado con exito</p>}
        </form>
      )}
      </Formik>
  </section>

  )
}

export default index


