
import http from '../http-common';

const API_URL = 'https://azure-acrobats.azurewebsites.net/api/';

class TwoAService {

  getTwoA(){
    return http.get(API_URL + 'twoa/');
  }

}

export default new TwoAService();