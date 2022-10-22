import React from 'react'
import './Menu.css'
import M from '../../assets/Img/M.png'


const index = () => {
  return (
    <div className="options__menu">
      <div className="options__menu-high">
        <a><img src={M} /></a>
        <div className="options__menu__container-red">
          <i className="fa-solid fa-diagram-project"></i>
        </div>
      </div>

      <div className="options__menu-low">
        <i className="fa-solid fa-house"></i>
        <i className="fa-solid fa-bullhorn"></i>
        <i className="fa-solid fa-headset"></i>
        <i className="fa-solid fa-cart-shopping"></i>
        <i className="fa-solid fa-file"></i>
        <i className="fa-solid fa-person"></i>
        <i className="fa-solid fa-lock"></i>
        <i className="fa-solid fa-users-line"></i>
        <i className="fa-regular fa-circle-question"></i>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
  )
}

export default index
