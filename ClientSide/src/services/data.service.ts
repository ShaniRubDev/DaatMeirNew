import axios from "axios"

export default new class dataService {
    BASE_URL = "http://localhost:8000/emotion";


    getAllData() {
        
        return axios.get(this.BASE_URL + "/get_data");
            // .then((res) => { console.log(res.data) })
            // .catch((err) => console.log(err))
    }

  
}

