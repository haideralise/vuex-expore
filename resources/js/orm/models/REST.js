import { Model } from '@vuex-orm/core'
import Request from "../Request";
export default class REST extends Model{
    apiUrl = '';

    static persist = true;
    static success = true;
    static error = true;

    static set persist(v) {this.persist = v;}
    static get persist() {return this.persist; }

    static set error(v) {this.error = v;}
    static get error() {return this.error; }

    static set success(v) { this.success = v; }
    static get success() { return this.success; }

    static enablePersist() { this.persist = true; }
    static disablePersist() { this.persist = false; }

    static enableError() { this.error = true; }
    static disableError() { this.error = false; }

    static enableSuccess() { this.success = true; }
    static disableSuccess() { this.success = false; }

    isConfigEnable(key){
        return this.constructor[key];
    }
    plurallize(noun, suffix = 's') {
        return `${noun}${suffix}`;
    }
    getApiUrl(data = {}) {
        return this.apiUrl;
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
    makeCopy() {
        let obj = JSON.parse(JSON.stringify(this));
        return Object.assign(new (this.constructor)(), obj);
    }
    setApiUrl(url){
        this.apiUrl = url;
        return this;
    }
    api(){
        return new Request(this.getApiUrl(), this);
    }
    mapInput(){
        let obj  =  Object.assign({}, this);
        delete obj.$id;
        return obj;
    }
}
