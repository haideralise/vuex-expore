<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(\App\Ingredient::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'unit' => ['kg', 'packet', 'litter'][random_int(0,2)],
        'price' => random_int(1,100),
        'vendor_id' => \App\Vendor::inRandomOrder()->first()->id
    ];
});
