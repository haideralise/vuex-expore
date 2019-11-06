@extends('layouts.app')

@section('content')
<div class="container">
    <router-link to="/">Vendors</router-link>
    <router-link to="/ingredients">Ingredients</router-link>
    <router-view></router-view>
</div>
@endsection
