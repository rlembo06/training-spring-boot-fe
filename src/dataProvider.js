import axios from 'axios';
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    DELETE_MANY,
} from 'react-admin';
import Produit from './models/Produit';

const apiUrl = 'http://localhost:9090';
const apiUrlTries = `${apiUrl}/ProduitsTries`;

/**
 * Maps react-admin queries to my REST API
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */
export default async (type, resource, params) => {
    let url = '';
    console.log('RA - resource: ', resource, 'params: ', params);

    switch (type) {
        case GET_LIST: {
            const { data } = await axios.get(apiUrlTries);

            return { data, total: data && data.length > 0 ? data.length : 0 } ;
        }

        case GET_ONE: {
            url = `${apiUrl}/${resource}/${params.id}`;
            const { data } = await axios.get(url);
            return { data } ;
        }

        case UPDATE: {
            url = `${apiUrl}/${resource}`;

            await axios.put(url, new Produit(params.data));
            return { data: params.data } ;
        }

        case CREATE: {
            url = `${apiUrl}/${resource}/`;

            await axios.post(url, new Produit(params.data));
            const data = {...params.data, id: null};
            return { data } ;
        }

        case DELETE: {
            url = `${apiUrl}/${resource}/${params.id}`;

            await axios.delete(url);
            return { data: null } ;
        }

        case DELETE_MANY:
            params.ids && params.ids.length > 0 && params.ids.forEach(id => {
                url = `${apiUrl}/Produits/${id}`;
                axios.delete(url);
            });
            await axios.get(apiUrlTries);
            return { data: [] } ;

        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);

    }

};
