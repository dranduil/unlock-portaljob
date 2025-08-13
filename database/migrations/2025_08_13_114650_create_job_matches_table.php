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
        Schema::create('job_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('job_posting_id')->constrained()->onDelete('cascade');
            $table->decimal('score', 5, 2); // 0.00 to 100.00
            $table->json('explanation')->nullable(); // Detailed breakdown of the score
            $table->boolean('is_relevant')->default(true); // User feedback
            $table->timestamp('viewed_at')->nullable();
            $table->timestamps();
            
            $table->unique(['user_id', 'job_posting_id']);
            $table->index(['user_id', 'score', 'created_at']);
            $table->index(['job_posting_id', 'score', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_matches');
    }
};
