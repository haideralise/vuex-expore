import Vuex from 'vuex';
import Vue from 'vue';
import vendors from  './modules/vendor';

Vue.use(Vuex);

// create store
export default  new Vuex.Store({
    modules : {
        vendors
    }
});
