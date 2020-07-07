import axios from 'axios';

const instance = axios.create({ 
    baseURL : `https://api.unsplash.com/photos/random?client_id=${KEY}&count=30`
});