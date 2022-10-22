import React from 'react'
import './Header.css'
import españa from '../../assets/Img/españa-removebg-preview.png'

const index = () => {
  return (
    <div className="header__container">
      <div className="header__left">
        <i className="fa-regular fa-square-check"></i>
        <i className="fa-regular fa-message"></i>
        <i className="fa-regular fa-envelope"></i>
        <i className="fa-regular fa-calendar"></i>
        <i className="fa-regular fa-star"></i>
      </div>

      <div className="header__Right">
        <img src={españa}/>
        <span>Español</span>
        <i className="fa-solid fa-magnifying-glass"></i>
        <i className="fa-solid fa-cart-shopping"></i>
        <i className="fa-regular fa-bell"></i>
        <span> Santiago Sierra <br/> Admin </span>
        <span className="header__right--final-span">SS</span>
      </div>
    </div>
  )
}

export default index
