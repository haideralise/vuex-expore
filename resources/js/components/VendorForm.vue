<template>
        <div>
            <h1>Vendor</h1>
            <p>Name : <input type="text" v-model="vendor.name" class="form-control"></p>
            <p>Contact : <input type="text" v-model="vendor.contact" class="form-control"></p>
            <p>Address : <input type="text" v-model="vendor.address" class="form-control"></p>
            <button class="btn btn-primary" @click="save">Save</button>
            <button class="btn btn-default" @click="cancel">Cancel</button>
        </div>
</template>

<script>
    export default {
        name: "VendorForm",
        props: ['vendor', 'save', 'cancel']
    }
</script>

<style scoped>

</style>
