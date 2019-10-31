import Eloquent from "./Eloquent";
export default class Ingredient extends Eloquent {
    apiUrl = 'http://localhost:8000/api/ingredients';
    static get entity () {
        return 'ingredients'
    }
    static fields () {
        return {
            id: this.attr(null),
            name: this.attr(''),
            unit: this.attr('kg'),
            price: this.attr(1),
            vendor_id : this.attr(null)
        }
    }
}
