<template>
    <div>
        <div>
            <h1>{{ vendor.name }} Vendor</h1>
            <div>
                <p>Name : <input type="text" v-model="vendor.name" class="form-control"></p>
                <p>Contact : <input type="text" v-model="vendor.contact" class="form-control"></p>
                <p>Address : <input type="text" v-model="vendor.address" class="form-control"></p>
                <button class="btn btn-primary" @click="save">Save</button>
                <button class="btn btn-default" @click="cancel">Cancel</button>
            </div>
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
        <!--<vendor-form :vendor="vendor" :add-vendor="addVendor"></vendor-form>-->
    </div>
</template>

<script>
    import Vendor from "./../orm/models/Vendor";
    import vendor from "../store/modules/vendor";
    import IngredientList from "./IngredientList";
    export default {
        components: {IngredientList},
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
                let response = await this.vendor.request().put();
                response.success(async () => {
                    this.vendor.name = 'change';
                    await this.vendor.$save();
                  /*  await Vendor.update({
                        where: response.data.vendor.id,
                        data: response.data.vendor
                    });
                  */  response.showSuccessMessage();
                    this.setDefaultVendor();
                    this.mapVendors();

                }).error(() => {
                    response.showErrorMessage();
                });
            },
            async save() {
                let update = false;
                if(this.vendor.id) {
                    update = await this.updateVendor();
                }else{
                    update = await this.addVendor();
                }
            },
            async addVendor(){
                   let response = await this.vendor.request().post();
                this.mapVendors();

                /* response.success(async () => {
                      await Vendor.insert({
                          data: response.data.vendor
                      });
                      response.showSuccessMessage();
                     this.setDefaultVendor();
                     this.mapVendors();

                 }).error(() => {
                      response.showErrorMessage();
                 });*/
            },
            getDefaultVendor(){
                return new Vendor();
            },
            mapVendors(){
                this.vendors =  this.vendors = Vendor.query().with('ingredients').orderBy('id', 'desc').all();
            },
            async deleteVendor(vendor){
                let response = await vendor.request().delete();
                response.success(async ()=> {
                    await Vendor.delete(vendor.id);
                    response.showSuccessMessage();
                    this.mapVendors();
                }).error(()=>{
                    response.showErrorMessage();
                });

            },
            async fetchVendors(){
                let vendor = new Vendor();
                let response = await vendor.request().get();
                await Vendor.insert({ data: response.data });
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
