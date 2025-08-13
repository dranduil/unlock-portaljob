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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('website')->nullable();
            $table->string('logo_url')->nullable();
            $table->json('locations')->nullable(); // Array of locations
            $table->string('industry')->nullable();
            $table->string('size')->nullable(); // small, medium, large
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('owner_user_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['active', 'pending', 'suspended'])->default('pending');
            $table->timestamps();
            
            $table->index(['slug', 'status']);
            $table->index(['verified_at', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
