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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_posting_id')->constrained()->onDelete('cascade');
            $table->foreignId('candidate_user_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['new', 'reviewing', 'shortlisted', 'interviewing', 'offer', 'rejected', 'withdrawn'])->default('new');
            $table->text('cover_letter')->nullable();
            $table->json('answers')->nullable(); // Custom questions answers
            $table->string('source')->nullable(); // How they found the job
            $table->text('notes')->nullable(); // HR notes
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
            
            $table->unique(['job_posting_id', 'candidate_user_id']);
            $table->index(['status', 'created_at']);
            $table->index(['candidate_user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
