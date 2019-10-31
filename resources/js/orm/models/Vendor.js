import { Model } from '@vuex-orm/core'
import Eloquent from "./Eloquent";
const ApiUrl = 'http://localhost:8000/api/vendors';
export default class Vendor extends Eloquent {
    static get entity () {
        return 'vendors'
    }
    static fields () {
        return {
            id: this.attr(null),
            name: this.attr(''),
            contact: this.attr(''),
            address: this.attr(''),
        }
    }
}
