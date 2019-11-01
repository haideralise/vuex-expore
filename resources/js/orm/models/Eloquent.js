import { Model } from '@vuex-orm/core'
import Request from "../Request";
import Vendor from "./Vendor";
class Eloquent extends Model{
    apiUrl = '';
    pluarize(noun, suffix = 's') {
        return `${noun}${suffix}`;
    }

    getDataKey(config = {}){
        return this.sigularize(this.constructor.name);
    }
    sigularize(noun) {
        if((noun[noun.length - 2] == 's' && noun[noun.length - 1] == 's')) {
            return noun.toLowerCase();
        }
        if(noun[noun.length - 1] == 's') {
            let characters = noun.toLowerCase().split('');
            characters.pop();
            return  characters.join('');
        }

       return noun.toLowerCase();
    }
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
