<template>
    <div>
        <div class="row">
            <input type="hidden" name="name" v-model="vendor.id" />
            <input type="text" name="name" v-model="vendor.name" />
            <input type="text" name="name" v-model="vendor.contact" />
            <input type="text" name="name" v-model="vendor.address" />
            <button class="btn btn-primary" @click="addVendor(vendor)">Save</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VendorForm",
        props: ['vendor', 'addVendor']
    }
</script>

<style scoped>

</style>
