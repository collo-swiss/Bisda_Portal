import Vue from 'vue';
import * as axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000';

var csrftoken = Cookies.get('csrftoken');
Vue.axios.headers.common['X-CSRFTOKEN'] = csrftoken;

function upload(formData) {
    const url = `${BASE_URL}/loader/upload/`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.id}` })));
}

export { upload }