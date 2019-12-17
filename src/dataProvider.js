import { stringify } from 'query-string';
import axios from 'axios';
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    GET_MANY,
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

        case GET_MANY: {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };

            url = `${apiUrl}/${resource}?${stringify(query)}`;

            const { data: { data: items, count: total }} = await axios.get(url);
            //const data = items.map(i => ({...i, id: i._id}));
            const data = items.map(i => {
                i.id = i._id;
                //delete i._id;
                //delete i.restaurant_id;
                return {...i}
            });
            return { data, total } ;
        }

        case GET_ONE: {
            url = `${apiUrl}/${resource}/${params.id}`;
            const { data } = await axios.get(url);
            return { data } ;
        }

        case UPDATE: {
            url = `${apiUrl}/${resource}/${params.id}`;

            const formData = new FormData();
            formData.append('cuisine', params.data.cuisine);
            formData.append('nom', params.data.name);

            await axios.put(url, formData);
            return { data: params.data } ;
        }

        case CREATE: {
            url = `${apiUrl}/${resource}/`;

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
            url = `${apiUrl}/${resource}/${params.id}`;
            await axios.delete(url);
            return { data: null } ;
        }

        case DELETE_MANY:
            params.ids && params.ids.length > 0 && params.ids.forEach(id => {
                url = `${apiUrl}/${resource}/${id}`;
                axios.delete(url);
            });
            return { data: [] } ;

        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);

    }

};
