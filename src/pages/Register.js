import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'

//
import {MyContext} from '../context/Context'

export default function Register() {
    const {
        fn : {
        registerUser
    },
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

    function onRegister(){
        registerUser(user)
    }

    return (
        <div className='container'>
            <main className=' f-center' style={{ minHeight: '100vh' }}>
                <div className='shadow py-3 px-4 bg-white rounded'
                    style={{ minWidth: "320px" }}
                >
                    <h3 className='text-center text-uppercase m-0 mb-3'>Register</h3>
                    <div className='form-group mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' className='form-control'
                            name='name'
                            value={user.name}
                            onChange={changeUser} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' className='form-control'
                            name='password'
                            value={user.password}
                            onChange={changeUser}

                        />
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <p className='m-0'>
                            <Link to='/login'>Login ?</Link>
                        </p>
                        <button type='button' className='btn btn-primary' onClick={onRegister}>
                        Register
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
