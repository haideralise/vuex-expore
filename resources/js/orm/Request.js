import Response from "./Response";

class Request {
    apiUrl = '';
    model = null;
    constructor(url, modelObject){
        this.apiUrl = url;
        this.model = modelObject;
    }
    errorCallback(error){
        toastr.error(Object.values(error.response.data.errors)[0], 'Error', {timeOut: 1500});
    }
    showSuccessMessage(response){
        if(response.data.message)
            toastr.success(response.data.message, 'Success', {timeOut: 1500});
    }
    async request(type = 'get', data = {})
    {
        let obj  =  Object.assign({}, this.model);
        delete obj.$id;
        let url =  this.apiUrl;
        if(obj.id) {
            url = `${this.apiUrl}/${obj.id}`;
        }
        try{
            let response = await axios[type](url, obj);
               return new Response(response);
        }catch (e) {
            return  new Response(e.response);
        }
    }
    async post() {
        let response = await this.request('post');
        for (let key in response.data.vendor) {
            this.model[key] = response.data.vendor[key];
        }
        this.model.$save();
    }
    async get() {
        return await this.request('get');
    }
    async put() {
        return await this.request('put');
    }
    async patch() {
        return await this.request('patch');
    }
    async delete() {
        return await this.request('delete');
    }
}
export default Request;
