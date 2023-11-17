import React from 'react'
import footerData from '../data/footer-data'
import socialData from "../data/social-data"
export default function Footer  ()  {
  return (
    <section>
      <ul>
     {
     footerData.map(
     (el)=>{
     return(<li key={el.name}>
     <a href={el.link}>
     {el.name}
     </a>
     </li>)
     }
         )
     } 
      </ul>
      <ul>
     {
     socialData.map(
     (el)=>{
     return(
     <li key={el.icon}>
     <a href={el.link}>
     {el.icon}
     </a>
     </li>)
     }
         )
     } 
      </ul>
    </section>
  )
}
