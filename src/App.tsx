import './App.css'
import ThemeProvider from './theme'
import { domMax, LazyMotion } from 'framer-motion'
import Router from './routes/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCallback } from 'react'
import { useDispatch } from './redux/store'
import { setSession } from './components/auth/utils/utils'

const App = () => {
    const dispatch = useDispatch()

    const initialize = useCallback(async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
        if (token) {
            setSession(token, dispatch)
        }
    }, [dispatch])
    initialize()

    return (
        <>
            <ThemeProvider>
                <LazyMotion strict features={domMax}></LazyMotion>
                <Router />
                <ToastContainer />
            </ThemeProvider>
        </>
    )
}

export default App
