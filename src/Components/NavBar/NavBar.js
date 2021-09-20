import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthProvider } from '../../Context/AuthProvider'
import Button from '../Button/Button';
import { useHistory } from 'react-router';
import { DataStore } from "@aws-amplify/datastore";

function NavBar() {
    const { signOut } = useAuthProvider();
    const history = useHistory();
    async function logout(){
        await signOut();
        localStorage.removeItem("user");
        DataStore.clear();
        history.push("/login")
    }
    return (
        <div className="flex justify-around items-center">
            <div className=" text-5xl p-7 font-bold ">
            <h1>Todo</h1>
        </div>
        <div>
        <Link to="/"><Button content="Todos"/></Link>
        <Link to="/files"><Button content="Files"/></Link>
        <Link to="/shared"><Button content="Shared"/></Link>
        <Button content="logout" onClick={logout}/>
        </div>
        </div>
    )
}

export default NavBar
