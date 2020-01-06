import axios from 'axios';

const token = localStorage.getItem('token');

export default class Api {
    static instance = axios.create({
        timeout: 10000,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    static get = url => this.instance.get(url);

    static post = (url, payload) => this.instance.post(url, payload);

    static put = (url, payload) => this.instance.put(url, payload);

    static delete = url => this.instance.delete(url);
}
