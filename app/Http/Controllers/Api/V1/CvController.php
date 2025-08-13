<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\CvDocument;
use App\Models\CvSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CvController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'format' => 'required|in:pdf,docx',
            'settings' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $doc = CvDocument::create([
            'user_id' => $request->user()->id,
            'name' => $data['name'],
            'format' => $data['format'],
            'status' => 'draft',
            'settings' => $data['settings'] ?? [],
        ]);

        return response()->json(['message' => 'CV created', 'data' => $doc], 201);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        $doc = CvDocument::with('sections')->where('user_id', $request->user()->id)->findOrFail($id);
        return response()->json(['data' => $doc]);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'format' => 'sometimes|in:pdf,docx',
            'status' => 'sometimes|in:draft,published,archived',
            'settings' => 'nullable|array',
            'sections' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $doc = CvDocument::where('user_id', $request->user()->id)->findOrFail($id);
        $data = $validator->validated();
        $doc->update(collect($data)->except('sections')->all());

        if (isset($data['sections']) && is_array($data['sections'])) {
            foreach ($data['sections'] as $section) {
                if (!empty($section['id'])) {
                    $existing = CvSection::where('cv_document_id', $doc->id)->find($section['id']);
                    if ($existing) {
                        $existing->update([
                            'type' => $section['type'],
                            'content' => $section['content'] ?? [],
                            'order' => $section['order'] ?? 0,
                            'is_visible' => $section['is_visible'] ?? true,
                        ]);
                        continue;
                    }
                }
                CvSection::create([
                    'cv_document_id' => $doc->id,
                    'type' => $section['type'],
                    'content' => $section['content'] ?? [],
                    'order' => $section['order'] ?? 0,
                    'is_visible' => $section['is_visible'] ?? true,
                ]);
            }
        }

        return response()->json(['message' => 'CV updated', 'data' => $doc->load('sections')]);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $doc = CvDocument::where('user_id', $request->user()->id)->findOrFail($id);
        $doc->delete();
        return response()->json(['message' => 'CV deleted']);
    }

    public function publicView(string $token): JsonResponse
    {
        $doc = CvDocument::where('share_token', $token)->first();
        if (!$doc || $doc->status !== 'published') {
            return response()->json(['message' => 'CV not found'], 404);
        }

        return response()->json(['data' => $doc->load('sections')]);
    }
}


