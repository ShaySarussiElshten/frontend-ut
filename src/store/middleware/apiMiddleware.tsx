import { API_RESPONSES } from "@/enum";



const apiResponseMiddleware = () => (next:any) => (action:any) => {
  if (action.isApiCall) {
    switch (action.status) {
      case API_RESPONSES.REQUEST_CANCELLED: {
        action.type += '_REQUEST_CANCELLED';
        break;
      }
      case API_RESPONSES.OK: {
        console.log("hey the respone works and pass through api middleware");
        break;
      }
      case API_RESPONSES.UN_AUTHORIZED: {
        action.type = 'UN_AUTHORIZED';
        break;
      }
      case API_RESPONSES.CONFLICT:
      case API_RESPONSES.BAD_REQUEST:
      case API_RESPONSES.NOT_ALLOWED:
      case API_RESPONSES.FORBIDDEN:
      case API_RESPONSES.ERROR:
      case API_RESPONSES.UN_SUPPORTED_MEDIA_TYPE:
      case API_RESPONSES.NOT_FOUND: {
        action.type += '_ERROR';
        console.log("hey the respone works and pass through api middleware");
        break;
      }
      default:
        break;
    }
  }
  next(action);
};

export default apiResponseMiddleware;
