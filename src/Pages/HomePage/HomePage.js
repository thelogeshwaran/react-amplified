import { toast } from 'react-toastify';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Todo from '../../Components/Todo/Todo';
import { useAuthProvider } from '../../Context/AuthProvider';

function HomePage() {
    const { signOut,setCurrentUser } = useAuthProvider();
    let history = useHistory();
    function logOut(){
        signOut();
        setCurrentUser(null)
        toast.success("Logged out!")
        history.push("/login")
    }
    return (
        <div>
            <button className="bg-green-500 active:bg-green-700 transform motion-safe:hover:scale-110" onClick={()=>logOut()}>
          SignOut
        </button>
            <Todo/>
        </div>
    )
}

export default HomePage
