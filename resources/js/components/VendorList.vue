<template>
    <div>
        <div>
            <vendor-form :vendor="vendor" :save="save" :cancel="cancel"></vendor-form>
            <div v-show="vendor.id">
                <ingredient-list :vendor="vendor"></ingredient-list>
            </div>
            <div v-if="!hideVendorList">
                <h1> {{ vendors.length ? 'Vendors': 'No Records!'}}</h1>
                <table class="table" v-if="vendors.length">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Ingredients</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="vendor in vendors" :key="vendor.id">
                        <td>{{ vendor.id }}</td>
                        <td>{{ vendor.name }}</td>
                        <td>{{ vendor.contact }}</td>
                        <td>{{ vendor.address }}</td>
                        <td>{{ vendor.ingredients.length }}</td>
                        <td>
                            <button class="btn btn-danger" @click="deleteVendor(vendor)">x</button>
                            <button class="btn btn-info" @click="getVendor(vendor)">i</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Vendor from "./../orm/models/Vendor";
    import IngredientList from "./IngredientList";
    import VendorForm from "./VendorForm";
    export default {
        components: {VendorForm, IngredientList},
        data(){
            return {
                vendor: this.getDefaultVendor(),
                vendors: [],
                hideVendorList: false
            };
        },
        methods: {
            getVendor(vendor) {
                let copy = vendor.makeCopy();
                this.vendor = copy;
                this.hideVendorList = true;
            },
            setDefaultVendor(){
                this.getVendor(this.getDefaultVendor());
                this.hideVendorList = false;
            },
            async updateVendor() {
                let response = await this.vendor.api().put();
                response.success(() => this.setDefaultVendor());
            },
            async save() {
                if(this.vendor.id) {
                    await this.updateVendor();
                }else{
                    await this.addVendor();
                }
                this.mapVendors();
            },
            async addVendor(){
                let response = await this.vendor.api().post();
                response.success(() => this.setDefaultVendor());
            },
            getDefaultVendor(){
                return new Vendor();
            },
            mapVendors(){
                this.vendors =  this.vendors = Vendor.query().with('ingredients').orderBy('id', 'desc').all();
            },
            async deleteVendor(vendor){
                await vendor.api().delete();
                this.mapVendors();

            },
            async fetchVendors(){
                this.setDefaultVendor();
                await this.vendor.api().get();

                this.mapVendors();
            },
            cancel(){
                this.setDefaultVendor();
            }
        },
        created() {
            this.fetchVendors();
        },

    }
</script>
