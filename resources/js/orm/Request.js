import Response from "./Response";

class Request {
    apiUrl = '';
    model = null;
    httpClient = null;
    response = null;
    constructor(url, modelObject){
        this.apiUrl = url;
        this.model = modelObject;
        this.httpClient = axios.create({
            baseURL: process.env.MIX_API_URL + url,
        });
    }

    setResponse(response){
        this.response = new Response(response);
        return this;
    }
    resetResponse(){
        this.response = null;
        return this;
    }
    getResponse(response){
        return this.response;
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
    async initiateRequest(callback){
        let response = await this.httpClient.post('',this.model.mapInput());

    }
    async post() {
        let response = await this.httpClient.post('',this.model.mapInput());
        this.setResponse(response);
        return this.performAction(new Response(response),(response) => this.persistRecord(response))
    }
    async get(persist = false) {

        let response = await this.httpClient.get(persist ? `${this.model.id}` : '');
        this.setResponse(response);
        //return  this.persistRecord()
        return this.performAction(this.persistRecord);
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

    performAction(callback){
        if(this.getResponse().isSuccess()) {
            if(this.model.isConfigEnable('persist')) {
                callback();
            }
            if(this.model.isConfigEnable('success')) {
                this.getResponse().showSuccessMessage();
            }
        }else {
            if(this.model.isConfigEnable('error')) {
                this.getResponse().showErrorMessage();
            }
        }
        return this.getResponse();
    }
    mapModelValues(response) {
        let data = response.data[this.model.getDataKey()];
        for (let key in data) {
            this.model[key] = data[key];
        }
    }
    persistRecord = (response) =>
    {
        this.mapModelValues(response)
        this.model.$save();
        return response;
    }
    insertCollection = () =>
    {
        this.model.constructor.insert({
            data: this.getResponse().data[this.model.plurallize(this.model.getDataKey())]
        })
        return this.getResponse();
    }
}
export default Request;
