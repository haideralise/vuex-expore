import REST from "./REST";
import Ingredient from "./Ingredient";
export default class Vendor extends REST {
    static get entity () {
        return 'vendors'
    }
    getApiUrl(data = {}) {
        return '/api/vendors';
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
