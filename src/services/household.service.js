
import http from '../http-common';

const API_URL = 'https://azure-acrobats.azurewebsites.net/api/';

class HouseholdService {

  getAllHouseholds(){
    return http.get(API_URL + 'households');
  }

  postHouseholds(data){
    return http.post(API_URL + 'households', data);
  }

}

export default new HouseholdService();