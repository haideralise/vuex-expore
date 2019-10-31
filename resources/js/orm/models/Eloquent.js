import { Model } from '@vuex-orm/core'
import Request from "../Request";
class Eloquent extends Model{
    apiUrl = '';

    async apiInsert() {
        let response = await this.request().post();
        return  response.data.vendor;
    }
    async apiUpdate() {
        let response = await this.request().post();
        return  response.data.vendor;
    }
    mapData(data){
        this.name = data.name;
        this.contact = data.contact;
        this.address = data.address;
        this.id = data.id;
        return this;
    }
    makeCopy() {
        let obj = JSON.parse(JSON.stringify(this));
        return Object.assign(new (this.constructor)(), obj);
    }
    setApiUrl(url){
        this.apiUrl = url;
        return this;
    }
    request(){
        return new Request(this.apiUrl, this);
    }
}

export default Eloquent;
