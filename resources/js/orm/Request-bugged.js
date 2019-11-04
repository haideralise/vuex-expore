import Response from "./Response";
import Vendor from "./models/Vendor";

class Request {
    model = null;
    httpClient = null;
    url = '';
    constructor(url, modelObject){
        this.url = url;
        this.model = modelObject;
        this.httpClient = axios.create({
            baseURL: process.env.MIX_API_URL + url,
        });
    }

    request()
    {
        return this.httpClient;
    }
    async methodCall(type, persist = false){
        try{
            let response = await this.httpClient.get(persist ? `/${this.model.id}` : '');
            return  new Response(response);
            switch (type) {
                case 'get':
                    return new Response(await this.httpClient.get(persist ? `/${this.model.id}` : ''));
                    break
                case 'post':
                    return await this.httpClient.post('', this.model.makeInput());
                    break
                case 'put':
                    return await this.httpClient.put(`/${this.model.id}`, this.model.mapInput());
                    break
                case 'patch':
                    return await this.httpClient.patch(`/${this.model.id}`, this.model.mapInput());
                    break
                case 'delete':
                    return await this.httpClient.delete(`${this.model.id}`);
                    break

            }
        //    return new Response(response);
        }catch (e) {
            console.log('cathc', e.response);
           return new Response(e.response);
        }

    }
    async handleRequest(type, callback, persist=false){
        let data = {};
        let url = {};
        var response = this.methodCall(type, persist);
        console.log('data in handle request', response.data);
        return this.performAction(response, callback)

    }
    async post() {
        return this.handleRequest('post', ()=> this.persistRecord);
    }
    async get(persist = false) {
        return await this.handleRequest('get', ()=> this.insertCollection,
            persist
        );
    }
    async put() {
        this.handleRequest('put', ()=>this.persistRecord);
    }
    async patch() {
        return this.handleRequest('patch', () => this.persistRecord(response))
    }
    async delete() {
        return this.handleRequest('delete', ()=>this.model.$delete());
    }

    /**
     *
     * @param response
     * @param callback
     * @returns {*}
     */
    performAction(response, callback){
        if(response.isSuccess()) {
            if(this.model.isConfigEnable('persist')) {
                callback(response);
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
    persistRecord(response)
    {
        this.mapModelValues(response)
        this.model.$save();
        return response;
    }
    insertCollection(response)
    {
        this.model.constructor.insert({
            data: response.responseData()[this.model.plurallize(this.model.getDataKey())]
        })
        return response;
    }
}
export default Request;
