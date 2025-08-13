<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Software Development', 'slug' => 'software-development', 'description' => 'Programming, coding, and software engineering roles', 'icon' => '💻', 'sort_order' => 1],
            ['name' => 'Data Science', 'slug' => 'data-science', 'description' => 'Data analysis, machine learning, and AI roles', 'icon' => '📊', 'sort_order' => 2],
            ['name' => 'Design', 'slug' => 'design', 'description' => 'UI/UX, graphic design, and creative roles', 'icon' => '🎨', 'sort_order' => 3],
            ['name' => 'Marketing', 'slug' => 'marketing', 'description' => 'Digital marketing, content, and growth roles', 'icon' => '📈', 'sort_order' => 4],
            ['name' => 'Sales', 'slug' => 'sales', 'description' => 'Business development and sales roles', 'icon' => '💰', 'sort_order' => 5],
            ['name' => 'Product Management', 'slug' => 'product-management', 'description' => 'Product strategy and management roles', 'icon' => '📋', 'sort_order' => 6],
            ['name' => 'Operations', 'slug' => 'operations', 'description' => 'Business operations and process management', 'icon' => '⚙️', 'sort_order' => 7],
            ['name' => 'Customer Support', 'slug' => 'customer-support', 'description' => 'Customer service and support roles', 'icon' => '🎧', 'sort_order' => 8],
            ['name' => 'Finance', 'slug' => 'finance', 'description' => 'Accounting, financial analysis, and banking', 'icon' => '🏦', 'sort_order' => 9],
            ['name' => 'Human Resources', 'slug' => 'human-resources', 'description' => 'HR, recruitment, and people operations', 'icon' => '👥', 'sort_order' => 10],
            ['name' => 'Legal', 'slug' => 'legal', 'description' => 'Legal counsel and compliance roles', 'icon' => '⚖️', 'sort_order' => 11],
            ['name' => 'Healthcare', 'slug' => 'healthcare', 'description' => 'Medical, nursing, and healthcare roles', 'icon' => '🏥', 'sort_order' => 12],
            ['name' => 'Education', 'slug' => 'education', 'description' => 'Teaching, training, and educational roles', 'icon' => '📚', 'sort_order' => 13],
            ['name' => 'Engineering', 'slug' => 'engineering', 'description' => 'Civil, mechanical, and electrical engineering', 'icon' => '🔧', 'sort_order' => 14],
            ['name' => 'Consulting', 'slug' => 'consulting', 'description' => 'Business and management consulting', 'icon' => '💼', 'sort_order' => 15],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'slug' => $category['slug'],
                'description' => $category['description'],
                'icon' => $category['icon'],
                'sort_order' => $category['sort_order'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
