import { reset, setWarrantyEndDate } from '../../../redux/slices/auth'
import axios from '../../../utils/axios'
import { paths } from '../../../routes/paths'
import { useDispatch } from 'react-redux'

export const tokenExpired = (exp: number, dispatch: any) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer

    const currentTime = Date.now()

    // Test token expires after 10s
    const timeLeft = exp * 1000 - currentTime

    clearTimeout(expiredTimer)

    expiredTimer = setTimeout(() => {
        alert('Token expired')

        localStorage.removeItem('token')
        dispatch(reset())

        window.location.href = paths.auth.login
    }, timeLeft)
}
const jwtDecode = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    )

    return JSON.parse(jsonPayload)
}
export const setSession = (token: string | null, dispatch?: unknown) => {
    if (token) {
        localStorage.setItem('token', token)

        axios.defaults.headers.common.Authorization = `Bearer ${token}`

        // This function below will handle when token is expired
        const { exp } = jwtDecode(token)
        tokenExpired(exp, dispatch)
    } else {
        localStorage.removeItem('token')

        delete axios.defaults.headers.common.Authorization
    }
}

export const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}
   

export const useWarrantyCheck = () => {
    const dispatch = useDispatch();

    const isUnderWarranty = (saleDate: Date | null | string, warrantyPeriodInMonths?: number) => {
        const sysDate = new Date();
        // Convert saleDate to Date object if it's a string
        let dateObject: Date | null = null;
        if (typeof saleDate === 'string') {
            dateObject = new Date(saleDate);
        } else {
            dateObject = saleDate;
        }
        // Check if dateObject is a valid Date
        if (dateObject && !isNaN(dateObject.getTime())) {
            const diffInYears = sysDate.getFullYear() - dateObject.getFullYear();
            const diffInMonths = sysDate.getMonth() - dateObject.getMonth() + diffInYears * 12;
            const diffInDays = sysDate.getDate() - dateObject.getDate();
            const warrantyEndDate = new Date(dateObject);
            if (warrantyPeriodInMonths) {
                warrantyEndDate.setMonth(warrantyEndDate.getMonth() + warrantyPeriodInMonths);
                const formattedWarrantyEndDate = formatDate(warrantyEndDate);

                dispatch(setWarrantyEndDate(formattedWarrantyEndDate));
            }
      
            if (warrantyPeriodInMonths && diffInMonths >= warrantyPeriodInMonths) {
                return false;
            }
            if (diffInMonths === warrantyPeriodInMonths && diffInDays >= 0) {
                return false;
            }
            if (dateObject === undefined || dateObject === null ) {
                return false;
            }
            return true;
        }
        return false; // If dateObject is not valid, return false
    };

    return { isUnderWarranty };
};