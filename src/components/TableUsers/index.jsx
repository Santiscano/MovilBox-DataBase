import React, { useState, useRef, useEffect} from 'react';
import './tableusers.css'
import { Grid } from "gridjs";
import { _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
// imagen sin datos
// import notData from '../../assets/Img/Empty_state_oops.png'

const index = () => {
  const wrapperRef = useRef(null);
  // const notDataUsers = notData;
  const handleEdit = (row) => {
    console.log('funcione', row);
  }



  const grid = new Grid({
    columns: ['#','Nombre','Correo Electronico', 'Perfil', 'Fecha',
      { 
        name: 'Acciones',
        formatter: (cell, row) => {
          return _(
            <button
              className={
                "button__edit-table"
              }
              onClick={() => handleEdit(row)}
            >
              Edit
            </button>
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
            }`)
          ,user.updated_at, null]
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