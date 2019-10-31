<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $fillable = ['name', 'unit', 'price', 'vendor_id'];
    const UNIT_PACKET = 'packet';
    const UNIT_KG = 'kg';
    const UNIT_LITTER = 'litter';
    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public static function availableUnits()
    {
        return [
            self::UNIT_PACKET,
            self::UNIT_KG,
            self::UNIT_LITTER
        ];
    }
}
