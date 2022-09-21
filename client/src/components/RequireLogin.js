import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../utils/auth"

export const RequireLogin = ({ children }) => {
    const auth = useAuth()
    const navigate = useNavigate()

    if(auth.user) {
        return <Navigate to='/home' />
    }
    return children
}