
import http from '../http-common';

const API_URL = 'https://azure-acrobats.azurewebsites.net/api/';

class CategoryService {

  getAllCategories(){
    return http.get(API_URL + 'categories');
  }

}

export default new CategoryService();