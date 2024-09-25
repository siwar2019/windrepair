import DashBoardView from '../../components/dashBoard/dashBoard-view'
import { RootState, useSelector } from '../../redux/store'
import { ROLES } from '../../utils/constants'
const DashBoardPage = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    return <>{!!user && user.role === ROLES.PARTNER && <DashBoardView />}</>
}

export default DashBoardPage
