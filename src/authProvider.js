import axios from 'axios';
import decodeJwt from 'jwt-decode';
import { AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK } from 'react-admin';

const apiUrl = 'http://localhost:9090';
const apiAuth = `${apiUrl}/authenticate`;

/**
 * Maps react-admin queries to my REST API
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */
export default async (type, payload) => {
    console.log('authProvider / type: ', type, '- payload: ', payload);

    switch (type) {
        case AUTH_LOGIN: {
            const response = await axios.post(apiAuth, payload);
            console.log('AUTH_LOGIN', response)
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            if (response && response.data) {
                const { token } = response.data;
                const decodedToken = decodeJwt(token);
                localStorage.setItem('token', token);
                localStorage.setItem('permissions', decodedToken.permissions);
            }
        }

        case AUTH_GET_PERMISSIONS: {
            const role = localStorage.getItem('permissions');
            return role ? Promise.resolve(role) : Promise.reject();
        }

        case AUTH_LOGOUT: {
            localStorage.removeItem('token');
            localStorage.removeItem('permissions');
            return Promise.resolve();
        }

        case AUTH_CHECK: {
            return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
        }

        default:
            return Promise.reject(new Error('Unknown method'));
    }
}
