
import http from '../http-common';

const API_URL = 'http://localhost:8080/api/';

class TwoAService {

  getTwoA(){
    return http.get(API_URL + 'twoa/');
  }

}

export default new TwoAService();