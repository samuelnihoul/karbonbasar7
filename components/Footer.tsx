import React from 'react'
import footerData from '../data/footer-data'
import socialData from "../data/social-data"
export default function Footer() {
  return (
    <section className='flex flex-row'>
      <ul className='flex flex-row flex-grow gap-[2rem] m-[2rem]'>
        {
          footerData.map(
            (el) => {
              return (<li key={el.name}>
                <a href={el.link}>
                  {el.name}
                </a>
              </li>)
            }
          )
        }
      </ul>
      <ul className='flex flex-row gap-[2rem] m-[2rem]'>
        {
          socialData.map(
            (el) => {
              return (
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
