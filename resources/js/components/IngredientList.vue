<template>
<div>
    <br/>
    <br/>
    <h1>{{ vendor.name }} Ingredients</h1>
    <button class="btn btn-primary" @click="add">+</button>
    <table class="table table-striped" v-show="vendor.ingredients.length">
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


</template>

<script>
    export default {
        name: "IngredientList",
        props : ['vendor'],
        methods: {
            add(){}
        }
    }
</script>

<style scoped>

</style>
