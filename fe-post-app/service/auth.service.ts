
import { postData} from '../utils/fetch-adapter'

export const login = (payload: {email: string, password: string}) => {
 
   return postData('api/login', payload)
};

export const register = (payload: {name: string, email: string, password: string}) => {
   return postData('api/register', payload)
};

export const logout = () => {
   return postData('api/logout', {})
};