import axios from "axios"

export default new class usersService {
    BASE_URL = "http://localhost:5000/user"
    logInUser(user: any) {
        console.log(user);
        return axios.post(this.BASE_URL + "/log-in", user, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        
        })
            .then((res) => {console.log(`the role is:${res.data.role}`);return res.data })
            .catch((err) => console.log(err))
    }

    // loggedUser(email: string) {
    //     return axios.get(this.BASE_URL + `/user-logged/${email}`);
    // }

    // logoutUser(){
    //     return axios.put(this.BASE_URL+'/user-logout');
    // }
}

