import axios from 'axios';


function API () {
    return axios.get('https://randomuser.me/api/?results=50&nat=us')
}

export default API