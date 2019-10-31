<template>
    <div>
        <div class="row">
            <h1>Vendors</h1>

            <h1>Vendors</h1>

            <h1 v-if="!vendors.length">No Records!</h1>
            <div class="alert alert-success" v-if="showToast && errorType == 'success'">{{ message }}</div>
            <div class="alert alert-danger" v-if="showToast && errorType == 'danger'">{{ message }}</div>

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
                    <td><button class="btn btn-danger" @click="deleteVendor(vendor)">x</button>
                        <button class="btn btn-info" @click="getVendor(vendor)">i</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <vendor-form :vendor="vendor" :add-vendor="addVendor"></vendor-form>
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import VendorForm from "./VendorForm";
    export default {
        components: {VendorForm},
        data(){
            return {
                vendor: this.getDefaultVendor(),
            };
        },
        computed : mapGetters(['vendors', 'selectedVendor', 'showToast', 'message', 'errorType']),
        methods: {
            ...mapActions(['fetchVendors', 'selectVendorF', 'saveVendor', 'defaultVendor', 'deleteVendor']),
            getVendor(vendor) {
                this.vendor = vendor;
            },
            getDefaultVendor(){
                return  {name: '', contact: '', address: '', id: null};
            },
            setDefaultVendor(){
                this.getVendor(this.getDefaultVendor());
            },
            addVendor(){
                this.saveVendor(this.vendor);
                this.setDefaultVendor();
            }
        },
        created() {
            this.fetchVendors();
        }
    }
</script>
