<template>
    <div>
        <div>
            <h1>Vendors</h1>
            <div>
                <p>Name : <input type="text" v-model="vendor.name" class="form-control"></p>
                <p>Contact : <input type="text" v-model="vendor.contact" class="form-control"></p>
                <p>Address : <input type="text" v-model="vendor.address" class="form-control"></p>
                <button class="btn btn-primary" @click="addVendor">Save</button>

            </div>

            <h1 v-if="!vendors.length">No Records!</h1>

            <table class="table" v-if="vendors.length">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="vendor in vendors" :key="vendor.id">
                    <td>{{ vendor.id }}</td>
                    <td>{{ vendor.name }}</td>
                    <td>{{ vendor.contact }}</td>
                    <td>{{ vendor.address }}</td>
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
                let copy = vendor.makeCopy();
                console.log(copy);
                this.vendor = copy;

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
                this.vendors = Vendor.query().orderBy('id', 'desc').all();
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

                this.vendors = Vendor.query().orderBy('id', 'desc').all();
            }
        },
        created() {

            const ApiUrl = 'http://localhost:8000/api/vendors';
            this.fetchVendors();
        },

    }
</script>
