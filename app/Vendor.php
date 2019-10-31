<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    protected $fillable = ['name', 'contact', 'address'];

    public function ingredients() {
        return $this->hasMany(Ingredient::class);
    }
}
