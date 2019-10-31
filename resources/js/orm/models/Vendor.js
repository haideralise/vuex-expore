import { Model } from '@vuex-orm/core'
import Eloquent from "./Eloquent";
import Ingredient from "./Ingredient";
const ApiUrl = 'http://localhost:8000/api/vendors';
export default class Vendor extends Eloquent {
    apiUrl = 'http://localhost:8000/api/vendors';
    static get entity () {
        return 'vendors'
    }
    static fields () {
        return {
            id: this.attr(null),
            name: this.attr(''),
            contact: this.attr(''),
            address: this.attr(''),
            ingredients: this.hasMany(Ingredient, 'vendor_id')
        }
    }
}
