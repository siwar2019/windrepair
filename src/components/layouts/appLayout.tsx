import Footer from '../footer/footer'
import { Box } from '@mui/material'
import NavBar from '../navBar/navBar'
import { useSelector } from '../../redux/store'
import NavBarConnectedUser from '../navBar-connected-user/navBar'

type AppProps = {
    children: React.ReactNode
}
const AppLayout = ({ children, ...other }: AppProps) => {
    const { isAuthenticated } = useSelector((state) => state.auth)

    return (
        <>
            {!isAuthenticated ? (
                <>
                    <NavBar />
                    <Box {...other}>{children}</Box>
                    <Footer />
                </>
            ) : (
                <NavBarConnectedUser {...other}>{children} </NavBarConnectedUser>
            )}
        </>
    )
}
export default AppLayout
