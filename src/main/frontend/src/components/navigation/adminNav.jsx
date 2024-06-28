
import {useAuth} from "../../state/auth/useAuth";

let AdminNav = ({children}) =>{
    const {  role } = useAuth();

    if( !(role==="ADMIN")){
        return null
    }

    return children ;
}

export default AdminNav;