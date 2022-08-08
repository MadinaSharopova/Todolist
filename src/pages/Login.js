import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

//
import { MyContext } from '../context/Context'

export default function Login() {
    const {
        fn: { login },
    } = useContext(MyContext)
    const [user, setUser] = useState({
        name: "",
        password: "",
    })



    function changeUser(e) {
        const { value, name } = e.target;
        setUser((p) => ({
            ...p,
            [name]: value,
        }))
    }

function onLogin(){
    login(user)
}

    return (
        <div className='container'>
            <main className=' f-center' style={{ minHeight: '100vh' }}>
                <div className='shadow py-3 px-4 bg-white rounded'
                    style={{ minWidth: "320px" }}
                >
                    <h3 className='text-center text-uppercase m-0 mb-3'>Login</h3>
                    <div className='form-group mb-2'>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id='name'
                            className='form-control'
                            value={user.name}
                            name='name'
                            onChange={changeUser}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        id='password' 
                        className='form-control'
                        value={user.password}
                            name='password'
                            onChange={changeUser}
                         />
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <p className='m-0'>
                            <Link to='/register'>Register ?</Link>
                        </p>
                        <button type='button' className='btn btn-primary'
                        onClick={onLogin}
                        >
                        Login
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
