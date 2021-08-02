
import http from '../http-common';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {

  getUser(id){
    return http.get(API_URL + id);
  }

  deleteUser(id){
    return http.delete(API_URL + id);
  }
}

export default new UserService();