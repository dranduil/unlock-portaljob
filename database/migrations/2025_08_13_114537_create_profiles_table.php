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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('headline')->nullable();
            $table->text('summary')->nullable();
            $table->string('location')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->json('skills')->nullable(); // Array of skills
            $table->json('languages')->nullable(); // Array of languages with proficiency
            $table->json('work_preferences')->nullable(); // Remote preference, salary expectations, etc.
            $table->enum('visibility', ['public', 'link-only', 'private'])->default('public');
            $table->string('linkedin_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('portfolio_url')->nullable();
            $table->timestamps();
            
            $table->index(['visibility', 'location']);
            $table->index(['user_id', 'visibility']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
