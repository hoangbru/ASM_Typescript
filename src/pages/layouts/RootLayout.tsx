import React from 'react'
import Nav from '../Nav'
import { Outlet } from 'react-router-dom'

type Props = {}

const RootLayout = (props: Props) => {
  return (
    <div className='main'>
        <header>
            <Nav/>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer className='footer'>
        <span>Design & made by vithoang</span>
        </footer>
    </div>
  )
}

export default RootLayout