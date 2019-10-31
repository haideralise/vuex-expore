<template>
    <div>
        <div>
            <h1>{{ vendor.name }} Vendor</h1>
            <div>
                <p>Name : <input type="text" v-model="vendor.name" class="form-control"></p>
                <p>Contact : <input type="text" v-model="vendor.contact" class="form-control"></p>
                <p>Address : <input type="text" v-model="vendor.address" class="form-control"></p>
                <button class="btn btn-primary" @click="addVendor">Save</button>
            </div>
            <div v-show="vendor.ingredients.length">
                <h1>{{ vendor.name }} Ingredients</h1>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="ingredient in vendor.ingredients">
                        <td>{{ ingredient.id}}</td>
                        <td>{{ ingredient.name}}</td>
                        <td>{{ ingredient.unit}}</td>
                        <td>{{ ingredient.price }}</td>
                    </tr>

                    </tbody>
                </table>
                <hr/>
            </div>

            <h1 v-if="!vendors.length">No Records!</h1>
            <h1>Vendors</h1>
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
        <!--<vendor-form :vendor="vendor" :add-vendor="addVendor"></vendor-form>-->
    </div>
</template>

<script>
    import Vendor from "./../orm/models/Vendor";
    import vendor from "../store/modules/vendor";
    export default {
        data(){
            return {
                vendor: this.getDefaultVendor(),
                vendors: []
            };
        },
        methods: {
            getVendor(vendor) {
                this.vendor = vendor;
                console.log(vendor);
               /* let copy = vendor.makeCopy();
                console.log(copy);
                this.vendor = copy;*/

            },
            setDefaultVendor(){
                this.getVendor(this.getDefaultVendor());
            },
            async addVendor(){
                let response = await this.vendor.request().post();
                if(Vendor.find(response.data.vendor.id)){
                    await Vendor.update({
                        where: response.data.vendor.id,
                        data: response.data.vendor
                    });
                }else {
                    await Vendor.insert({
                        data : response.data.vendor
                    });
                }

                this.mapVendors();
                this.setDefaultVendor();
            },
            getDefaultVendor(){
                return new Vendor();
            },
            mapVendors(){
                this.vendors =  this.vendors = Vendor.query().with('ingredients').orderBy('id', 'desc').all();
            },
            async deleteVendor(vendor){
                let response = await vendor.request().delete();
                if(response.status === 200) {
                 await Vendor.delete(vendor.id);
                 this.mapVendors();
                }
            },
            async fetchVendors(){
                let vendor = new Vendor();
                let response = await vendor.request().get();
                await Vendor.insert({ data: response.data });
                this.mapVendors();
            }
        },
        created() {
            this.fetchVendors();
        },

    }
</script>
