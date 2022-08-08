import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//
import { myAxios } from '../sevices/axios'

export const MyContext = createContext()

export default function Context({ children }) {
    const navigate = useNavigate()

    const [auth, setAuth] = useState({
        user: null,
        token: null,
        isAuth: false,
        loading: false,
    })

    useEffect(() => {
        userme()
    }, [])

    async function userme() {
        setAuth((p) => ({
            ...p,
            loading: true,
        }))
        try {
            const res = await myAxios('/auth/userme')
            setAuth((p) => ({
                ...p,
                user: res.data.user,
                token: localStorage.getItem("TOKEN"),
                isAuth: true,
            }))
        } catch (error) {
            localStorage.removeItem('TOKEN')
            navigate("/login")
        }
        finally {
            setAuth((p) => ({
                ...p,
                loading: false,
            }))
        }
    }

    async function registerUser(body) {
        setAuth((p) => ({
            ...p,
            loading: true,
        }))
        try {
            const res = await myAxios.post('/auth/register', body)
            setAuth((p) => ({
                ...p,
                user: res.data.user,
                token: res.data.token,
                isAuth: true,
            }))
            localStorage.setItem("TOKEN", res.data.token)
        } catch (error) {
            console.log(error);
        } finally {
            setAuth((p) => ({
                ...p,
                loading: false,
            }))
        }
    }

    async function login(body) {
        setAuth((p) => ({
            ...p,
            loading: true,
        }))
        try {
            const res = await myAxios.post('/auth/login', body)
            localStorage.setItem("TOKEN", res.data.token)
            setAuth((p) => ({
                ...p,
                user: res.data.user,
                token: res.data.token,
                isAuth: true,
            }))

        } catch (error) {

        } finally {
            setAuth((p) => ({
                ...p,
                loading: false,
            }))
        }
    }

    return (
        <MyContext.Provider
            value={
                {
                    state: {
                        auth,
                    },
                    fn: {
                        registerUser,
                        login,
                    },
                }
            }
        >
            {children}
        </MyContext.Provider>
    )
}
