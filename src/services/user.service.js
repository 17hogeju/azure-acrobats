
import http from '../http-common';

const API_URL = 'https://azure-acrobats.azurewebsites.net/api/user/';

class UserService {

  getUser(id){
    return http.get(API_URL + id);
  }

  deleteUser(id){
    return http.delete(API_URL + id);
  }
}

export default new UserService();