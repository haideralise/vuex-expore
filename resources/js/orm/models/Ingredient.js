import REST from "./REST";
export default class Ingredient extends REST {
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
