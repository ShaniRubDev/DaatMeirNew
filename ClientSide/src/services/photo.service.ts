import axios from "axios";
import { error } from "console";

export default new class PhotoService {
    BASE_PATH = "http://localhost:8000/upload-image"

    uploadImg(img: any) {
        debugger
        let formImg = new FormData();
        formImg.append("faceImg", img);
        return axios.post("http://localhost:8000/upload-image", formImg, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}

// import axios from "axios";

// export default class PhotoService {
//     UploadImg(img: File): Promise<any> {
//         const formImg = new FormData();
//         formImg.append("faceImg", img);

//         return axios.post("YOUR_UPLOAD_URL", formImg) // Replace "YOUR_UPLOAD_URL" with your actual upload endpoint
//             .then(response => {
//                 // Handle successful response
//                 console.log("Upload successful", response);
//                 return response.data;
//             })
//             .catch(error => {
//                 // Handle error
//                 console.error("Upload failed", error);
//                 throw error;
//             });
//     }
// }
