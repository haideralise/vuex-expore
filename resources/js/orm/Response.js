export default class Response {
    response = {};
    data = {};
    status = 200;
    constructor(response){
       this.response = response;
       this.data = response.data;
       this.response.status = response.status;
    }
    isSuccess() {
        if(
            this.response.status
            && this.response.status >= 200
            && this.response.status <= 210
        ) {
            return  true;
        }
        if(this.response.data.errors)
            return  false;

        return false;
    }
    isFail(){
        return !this.isSuccess();
    }
    getErrorBag(errors) {
        let errorBag = [];
        for (let key in errors) {
            errorBag.push(errors[key][0]);
        }
        return errorBag;
    }
    showErrorMessage(message = '', title = 'Error', timeout = 1500) {
        if(message === '') {
            let errors = this.getErrorBag(this.response.data.errors);
            message = errors[0];
        }
        toastr.error(message, title, {timeOut: timeout});
    }
    showSuccessMessage(message = '', title = 'Success', timeout = 1500){
        if(!message.length && this.response.data.message) {
            message = this.response.data.message
        }
        toastr.success(message, title, {timeOut: timeout});
    }
    success(callback){
        if(this.isSuccess()) {
            callback();
        }
        return this;
    }
    error(callback){
        if(this.isFail()) {
            callback();
        }
        return this;
    }
}
