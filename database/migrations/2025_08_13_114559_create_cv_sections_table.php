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
        Schema::create('cv_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cv_document_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages']);
            $table->json('content'); // Section-specific content structure
            $table->integer('order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
            
            $table->index(['cv_document_id', 'order']);
            $table->index(['cv_document_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_sections');
    }
};
