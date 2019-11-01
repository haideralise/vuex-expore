import Response from "./Response";

class Request {
    apiUrl = '';
    model = null;

    constructor(url, modelObject){
        this.apiUrl = url;
        this.model = modelObject;
    }

    async request(type = 'get', data = {})
    {
        let obj  = this.model.mapInput();
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
        return this.performAction(response, ()=>{
                this.mapModelValues(response)
                this.model.$save();
            })
    }
    async get() {
        let response = await this.request('get');
        return this.performAction(response, ()=>{
            this.mapModelValues(response)
            this.model.constructor.insert({data: response.data[this.model.plurallize(this.model.getDataKey())]});
        });
    }
    async put() {
        let response = await this.request('put');
        return this.performAction(response, ()=>{
            this.mapModelValues(response)
            this.model.$save();
        })
    }
    async patch() {
        let response = await this.request('patch');
        return this.performAction(response, ()=>{
            this.mapModelValues(response)
            this.model.$save();
        })
    }
    async delete() {
        let response = await this.request('delete');
        return this.performAction(response, ()=>this.model.$delete())
    }

    performAction(response, callback){
        if(response.isSuccess()) {
            if(this.model.isConfigEnable('persist')) {
                callback();
            }
            if(this.model.isConfigEnable('success')) {
                response.showSuccessMessage();
            }
        }else {
            if(this.model.isConfigEnable('error')) {
                response.showErrorMessage();
            }
        }
        return response;
    }
    mapModelValues(response) {
        let data = response.data[this.model.getDataKey()];
        for (let key in data) {
            this.model[key] = data[key];
        }
    }
}
export default Request;
