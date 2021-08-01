import axios from "axios";

const options = {
    'Content-Type': 'form-data',
}

const API_URL = 'http://localhost:8080/api/';

class UploadHouseholdsService {

    uploadCsv(file) {
        console.log(file);
        console.log(file.type);
        var bodyFormData = new FormData();
        bodyFormData.append('filename', "1627705089009-juliah-households_202107301854.csv");
        bodyFormData.append('originalname', "households_202107301854");
        bodyFormData.append('file', file);
        let options = {
            method: "post",
            url: API_URL + 'csv/upload/',
            data: bodyFormData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "multipart/form-data"
            },
        }
        return axios(options,).then(function (response) {
            //handle success
            console.log(response);
        })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);

                    //do something

                } else if (error.request) {
                    console.log(error.request);

                    //do something else

                } else if (error.message) {
                    console.log(error.message);

                    //do something other than the other two

                }
            });;
    }

}

export default new UploadHouseholdsService();