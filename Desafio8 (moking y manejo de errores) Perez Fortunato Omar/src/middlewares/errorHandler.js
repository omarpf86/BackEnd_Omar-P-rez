import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()

export const errorHandler = (error, req, res, next) => {
  console.log(`error ${error.message}`);
  const status = error.status || 500;
  if (status == 500) { return httpResponse.ServerError(res, error.message) }
  else if (status == 401) { return httpResponse.Unauthorized(res, error.message) }
  else if (status == 403) { return httpResponse.Forbidden(res, error.message) } 
  else return httpResponse.NotFound(res, error.message)
};
