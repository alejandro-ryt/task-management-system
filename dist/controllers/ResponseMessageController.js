import ResponseMessage from "../models/ResponseMessage";
export default class ResponseMessageController {
    returnMessage(msg, success) {
        return new ResponseMessage(msg, success);
    }
}
