import ResponseMessage from "../models/ResponseMessage";

export default class ResponseMessageController {
    returnMessage (msg: string, success: boolean) {
        return new ResponseMessage(msg, success)
    }
}
