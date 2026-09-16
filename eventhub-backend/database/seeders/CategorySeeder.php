<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create(['name'=>'Traiteur']);
        Category::create(['name'=>'Photographe']);
        Category::create(['name'=>'Décoration']);
        Category::create(['name'=>'DJ']);
        Category::create(['name'=>'Matériel']);
        Category::create(['name'=>'Pâtisserie']);
    }
}