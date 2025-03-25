export default class ResponseMessage {
    msg: string;
    success: boolean;
  
    constructor(msg: string, success: boolean) {
      this.msg = msg;
      this.success = success;
    }
  }
  