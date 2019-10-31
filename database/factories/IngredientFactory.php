<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Ingredient;
use Faker\Generator as Faker;

$factory->define(Ingredient::class, function (Faker $faker) {
    $availableUnits = Ingredient::availableUnits();
    return [
        'name' => $faker->name,
        'unit' => $availableUnits[random_int(0,count($availableUnits) - 1)],
        'price' => random_int(1,100),
        'vendor_id' => \App\Vendor::inRandomOrder()->first()->id
    ];
});
