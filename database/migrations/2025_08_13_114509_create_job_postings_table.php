<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('requirements')->nullable();
            $table->text('benefits')->nullable();
            $table->enum('employment_type', ['full-time', 'part-time', 'contract', 'internship', 'freelance']);
            $table->enum('seniority', ['entry', 'junior', 'mid', 'senior', 'lead', 'executive']);
            $table->enum('location_mode', ['onsite', 'hybrid', 'remote']);
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->json('tags')->nullable(); // Array of skill tags
            $table->enum('status', ['draft', 'published', 'closed', 'expired'])->default('draft');
            $table->timestamp('expires_at')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            
            $table->index(['status', 'published_at']);
            $table->index(['location_mode', 'country', 'city']);
            $table->index(['employment_type', 'seniority']);
            $table->index(['expires_at', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};
