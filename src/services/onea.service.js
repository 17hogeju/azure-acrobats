
import http from '../http-common';

const API_URL = 'http://localhost:8080/api/';

class OneAService {

  getOneA(hshd_num){
    return http.get(API_URL + 'onea/' + hshd_num);
  }

}

export default new OneAService();