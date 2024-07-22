import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBarComponent({img, name, nav = "" }) {
  return (
    <Link to={nav} className='flex justify-start items-center space-x-5 m-5'>
        <img src={img} alt='' className='w-8'/>
        <span>{name}</span>
    </Link>
  )
}
