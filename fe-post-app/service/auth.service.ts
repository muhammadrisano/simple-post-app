
import {fetchCsrfCookie, postData} from '../utils/fetch-adapter'
const getCookieValue = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift()?.replace("%3D", "");
};
export const login = async(payload: {email: string, password: string}) => {
   await fetchCsrfCookie()
    const csrfToken = getCookieValue('XSRF-TOKEN');
   return postData('api/login', payload, {
      headers: {
        'X-XSRF-TOKEN': csrfToken || '',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
   })
};