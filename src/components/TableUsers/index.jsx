import React, { useState, useRef, useEffect, useContext} from 'react';
import './tableusers.css'
import { Grid } from "gridjs";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import ModalUserContext from '../../useContext/modalsContext'


const index = () => {
  // context
  const { openCloseEdit, setOpenCloseEdit, IDUserToEdit, setIDUserToEdit } = useContext(ModalUserContext);


  const wrapperRef = useRef(null);
  // editar usuario
  const handleEdit = (row) => {
    // abre modal
    setOpenCloseEdit(!openCloseEdit);
    setIDUserToEdit(row._cells[0].data);
    console.log('este es el ID del usuario que abrira el modal', row._cells[0].data);
  }
  // eliminar usuario
  const handleDelete = (row) => {
    Swal.fire({
      title: '¿Esta seguro de eliminar el usuario seleccionado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#99cf16',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // funcion fetch eliminar
        fetch(`http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/1026146629/users/${row._cells[0].data}`,{
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "name": row._cells[0].data,
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.status === true){
            // notificacion usuario
            Swal.fire(
              'Deleted!',
              `El usuario ${data.user.name} fue eliminado`,
              'success'
            )
          }
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal, vuelve a intentar por Favor!',
          })
          console.error(err)
        });
      }
    })
  }


  const grid = new Grid({
    columns: ['#','Nombre','Correo Electronico', 'Perfil', 'Estado','Fecha',
      { 
        name: 'Acciones',
        formatter: (cell, row) => {
          return _(
            <section>
              <button
                className={
                  "button__edit-table"
                }
                onClick={() => handleEdit(row)}

              >
                Editar
              </button>
              <button
                className={
                  "button__delete-table"
                }
                onClick={() => handleDelete(row)}
              >
                Eliminar
              </button>
            </section>
          );
        }
      }

    ],
    server: {
      url: 'http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/1026146629/users/index',
        then: data => data.users.map(user => 
          [user.id, user.name, user.email,
            (`${
              user.profile == 1 ? 'Practicante'
              : user.profile == 2 ? 'Desarrollador'
              : user.profile == 3 ? 'Vendedor'
              : 'Administrador'
            }`),
            (`${
              user.state == 1 ? '   Activo   '
              : '   Inactivo   '
            }`),
            user.updated_at,
            null],
        ),
      },
    search: true,
    pagination: {
      enabled: true,
      limit: 8,
      summary: false,
    }, 
    sort: true,
    language: {
      'search': {
        'placeholder': '🔍 Search...'
      }
    }
  });
  useEffect(() => {
    grid.render(wrapperRef.current);
  });
  return <div ref={wrapperRef} />;
}

export default index