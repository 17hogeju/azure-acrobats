
import http from '../http-common';

const API_URL = 'https://azure-acrobats.azurewebsites.net/api/';

class OneAService {

  getHshdNums(){
    return http.get(API_URL + 'hshd_nums');
  }

}

export default new OneAService();