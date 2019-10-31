import axios from 'axios';

const state = {
    vendors: [],
    selectedVendor: {name: '', contact: '', address: '', id: null},
    message : '',
    showToast: false,
    errorType: 'success'
};
const ApiUrl = 'http://localhost:8000/api/vendors';
const getters = {
    vendors: state => state.vendors,
    selectedVendor: state => state.selectedVendor,
    showToast: state => state.showToast,
    message: state => state.message,
    errorType: state => state.errorType,


};
function errorRapper(errors){
    let errorBag = [];
    for (let key in errors) {
        errorBag.push(errors[key]);
    }
   return errorBag;
}

function showNotification(response, state) {
    if(response.response && response.response.status && response.response.status === 422) {
        state.message = errorRapper(response.response.data.errors).join(', ');
        state.errorType = 'danger';
        state.showToast = true;
        setTimeout(() => {
            state.showToast = false;
        }, 1500);
        return false
    }else {
        state.showToast = true;
        state.message = response.data.message;
        state.errorType = 'success';
        setTimeout(() => {
            state.showToast = false;
        }, 1500);
        return true;
    }
}
const actions = {
    async fetchVendors ({commit}) {
        const response = await axios.get(ApiUrl);
        commit('setVendors', response.data);
    },
    async addTodo ({commit}, vendor) {
        const response = await axios.post(ApiUrl, vendor);
        commit('newVendor', response.data);
    },
    async saveVendor ({commit}, vendor) {
        let url = ApiUrl;
        if(vendor.id) {
            url +=`/${vendor.id}`;
        }
        await axios.post(url, vendor)
            .then(response => commit('updateVendor', response))
            .catch(respnose => commit('updateVendor', respnose));

    },
    async deleteVendor ({commit}, vendor) {

        const response = await axios.delete(`${ApiUrl}/${vendor.id}`);
        commit('removeVendor', {vendor, response});
    },
    selectVendorF({commit}, vendor){
        commit('selectVendor', vendor);
    },
    defaultVendor({commit}, vendor = {name: '', contact: '', address: '', id: null}){
        commit('defaultVendor', vendor);
    }

};
const mutations = {
    setVendors: (state, vendors) => (state.vendors = vendors),
    newVendor: (state, vendor) => (state.vendors.unshift(vendor)),
    selectVendor: (state, vendor) => (state.selectedVendor = vendor),
    updateVendor: (state, response) => {

        if(showNotification(response, state)) {
            let vendor = response.data.vendor;
            let index = state.vendors.findIndex(v => v.id === vendor.id);
            if(index >= 0) {
                state.vendors[index] = vendor;
            }else{
                state.vendors.push(vendor);
            }
            state.selectedVendor ={name: '', contact: '', address: '', id: null};
        }

    },
    defaultVendor: (state, vendor) => {
        state.selectedVendor =vendor;
    },
    removeVendor: (state, response) => {
        state.vendors.splice(state.vendors.findIndex(v => v.id === response.vendor.id), 1);
        showNotification(response.response, state);

    },
};
export default {
    state,
    getters,
    actions,
    mutations
};
