import React from 'react'
import { useContext } from 'react'
import Products from '../Products/Products'
import HomeSlider from '../Slider/Slider'
import HomeCategories from '../HomeCategories/HomeCategories'


export default function Home() {

  return (
    <div className='nav-m'>
      <HomeSlider/>
      <HomeCategories/>
      <Products/>
    </div>
  )
}
