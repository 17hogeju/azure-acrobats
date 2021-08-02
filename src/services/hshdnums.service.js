
import http from '../http-common';

const API_URL = 'http://localhost:8080/api/';

class OneAService {

  getHshdNums(){
    return http.get(API_URL + 'hshd_nums');
  }

}

export default new OneAService();