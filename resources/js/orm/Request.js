class Request {
    apiUrl = '';
    model = null;
    constructor(url, modelObject){
        this.apiUrl = url;
        this.model = modelObject;
    }
    async request(type = 'get', data = {})
    {
        let obj  =  Object.assign({}, this.model);
        delete obj.$id;
        let url =  this.apiUrl;
        if(obj.id) {
            url = `${this.apiUrl}/${obj.id}`;
        }
        let response = '';
        switch (type) {
            case "post":
                response = await axios.post(url, obj);
                break;
            case "get":
                response = await axios.get(url, obj);
                break;
            case "put":
                response = await axios.put(url, obj);
                break;
            case "patch":
                response = await axios.patch(url, obj);
                break;
            case "delete":
                response = await axios.delete(url, obj);
                break;
        }
        return response;
    }
    async post() {
        return await this.request('post');
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
