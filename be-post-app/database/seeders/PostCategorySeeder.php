<?php

namespace Database\Seeders;

use App\Models\PostCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PostCategory::insert([
            [
                'name' => 'Technology',
            ],
            [
                'name' => 'Lifestyle',
            ],
            [
                'name' => 'Travel',
            ],
            [
                'name' => 'Food',
            ],
            [
                'name' => 'Sports',
            ],
            [
                'name' => 'Fashion',
            ],
            [
                'name' => 'Music',
            ],
            [
                'name' => 'Movies',
            ],
            [
                'name' => 'Books',
            ],
            [
                'name' => 'Other',
            ]
            ]);
    }
}
