import { NavigateFunction } from 'react-router-dom'

export const handleRedirect = (navigate: NavigateFunction, path: string) => {
    navigate(path)
}
