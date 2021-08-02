import axios from "axios";

const API_URL = 'https://azure-acrobats.azurewebsites.net/api/';

class UploadHouseholdsService {

    uploadCsv(file) {
        console.log(file);
        // console.log(file.type);
        // var bodyFormData = new FormData();
        // bodyFormData.append('file', file);
        let options = {
            method: "post",
            url: API_URL + 'csv/upload/',
            data: file,
            body: JSON.stringify(file),
        }
        return axios(options);
    }

}

export default new UploadHouseholdsService();