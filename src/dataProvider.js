import axios from 'axios';
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

const apiUrl = 'http://localhost:9090';

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
            url = `${apiUrl}/ProduitsTries`;
            const { data } = await axios.get(url);

            return { data, total: data && data.length > 0 ? data.length : 0 } ;
        }

        case GET_ONE: {
            url = `${apiUrl}/${resource}/${params.id}`;
            const { data } = await axios.get(url);
            return { data } ;
        }

        case UPDATE: {
            //url = `${apiUrl}/${resource}/${params.id}`;
            url = `${apiUrl}/Produits`;

            const formData = new FormData();
            formData.append('cuisine', params.data.cuisine);
            formData.append('nom', params.data.name);

            await axios.put(url, formData);
            return { data: params.data } ;
        }

        case CREATE: {
            //url = `${apiUrl}/${resource}/`;
            url = `${apiUrl}/Produits`;

            const formData = new FormData();
            formData.append('cuisine', params.data.cuisine);
            formData.append('nom', params.data.name);

            const { data: { result } } = await axios.post(url, formData);
            const data = {
                ...params.data,
                id: result,
            };
            return { data } ;
        }

        case DELETE: {
            //url = `${apiUrl}/${resource}/${params.id}`;
            url = `${apiUrl}/Produits/${params.id}`;

            await axios.delete(url);
            return { data: null } ;
        }

        case DELETE_MANY:
            params.ids && params.ids.length > 0 && params.ids.forEach(id => {
                url = `${apiUrl}/Produits/${params.id}`;
                axios.delete(url);
            });
            return { data: [] } ;

        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);

    }

};
