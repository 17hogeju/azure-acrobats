
import http from '../http-common';

const API_URL = 'http://localhost:8080/api/';

class CategoryService {

  getAllCategories(){
    return http.get(API_URL + 'categories');
  }

}

export default new CategoryService();