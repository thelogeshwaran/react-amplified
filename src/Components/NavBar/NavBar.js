import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'

function NavBar() {
    return (
        <div className="flex justify-around items-center">
            <div className=" text-5xl p-7 font-bold ">
            <h1>Todo</h1>
        </div>
        <div>
        <Link to="/"><Button content="Todos"/></Link>
        <Link to="/files"><Button content="Files"/></Link>
        </div>
        </div>
    )
}

export default NavBar
