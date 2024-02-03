import React from 'react'
import { Link } from 'react-router-dom'

function Redirector() {
    return (
        <div>
            Where do ou want to go
            <Link to={"/client"}> Client </Link>
            <Link to={"/restaurant"}> Restaurant </Link>
            <Link to={"/delivery"}> Delivery </Link>
        </div>
    )
}

export default Redirector
