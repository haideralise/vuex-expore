/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import VendorList from "./components/VendorList";

require('./bootstrap');
require('toastr/toastr');
window.Vue = require('vue');
window.toastr = require('toastr/toastr');
import store from './orm/store';
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

 const files = require.context('./', true, /\.vue$/i);
 files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.config.productionTip = false;
import VueRouter from 'vue-router'
import IngredientList from "./components/IngredientList";
import Vendor from "./orm/models/Vendor";

Vue.use(VueRouter);
const routes = [
    { path: '/',
        component: VendorList },
    { path: '/vendor/:id/ingredients',
        component: IngredientList,
        props: (route) => ({
            vendor: Vendor.query().with('ingredients').last() })
    }
];
const router = new VueRouter({
    routes // short for `routes: routes`
})



new Vue({ 'el': '#app',
    store,
    router
});
