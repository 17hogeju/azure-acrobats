
import http from '../http-common';

const API_URL = 'http://localhost:8080/api/';

class HouseholdService {

  getAllHouseholds(){
    return http.get(API_URL + 'households');
  }

  postHouseholds(data){
    return http.post(API_URL + 'households', data);
  }

}

export default new HouseholdService();