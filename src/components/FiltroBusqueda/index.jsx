import React, { useState, useContext } from 'react'
import './filtro.css'
// uso en este formik
import { Formik, Field  } from 'formik'


const index = () => {

  const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{8,40}$/, 
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  }
  const [enviado, setEnviado] = useState(false);
// usecontext
  // const charactersProfile = useContext(FetchProfileContext);
  

  return (
    <section className="filtroUsuarios">
      <div className="filtroUsuarios__container-title">
        <h3>Filtros de Búsqueda</h3>
        <button>Limpiar Filtros</button>
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
          // envia formulario
          console.log(values);
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
          <div className="formulario__filtroUsuarios">
            <div className="formulario__filtroUsuarios--item">
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

            <div className="formulario__filtroUsuarios--item">
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
            <div className="formulario__filtroUsuarios--item">
              <label htmlFor="">Perfil</label>
              <Field name="perfil" as="select" className="formulario__select" placeholder="Perfil">
                <option value="Administrador" className="defauld">Administrador</option>
                <option value="Autor" className="defauld">Autor</option>
                <option value="Diesñador" className="defauld">Diesñador</option>
                <option value="Editor" className="defauld">Editor</option>
                <option value="Mantenimiento" className="defauld">Mantenimiento</option>
                <option value="Suscriptor" className="defauld">Suscriptor</option>
              </Field>
            </div>

            <div className="formulario__filtroUsuarios--item">
              <label htmlFor="">Estado</label>
              <Field name="estado" as="select" className="formulario__select" placeholder="Estado">
                <option value="activo" className="defauld">Activo</option>
                <option value="inactivo" className="defauld">Inactivo</option>
              </Field>
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
