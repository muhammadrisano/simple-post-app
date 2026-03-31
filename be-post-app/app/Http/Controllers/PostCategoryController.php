<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostCategoryResource;
use App\Models\PostCategory;
use Illuminate\Http\Request;

class PostCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = PostCategory::all();
        return PostCategoryResource::collection($categories);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
        ]);
        try {
            $category = PostCategory::create($data);
            return response()->json([
                'message' => 'Category created successfully',
                'data' => new PostCategoryResource($category)
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Post Category creation failed',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
        ]);
        $category = PostCategory::find($id);
        if (!$category) {
            return response()->json([
                'message' => 'Category not found',
            ], 404);
        }
        try {
            $category->update($data);
            return response()->json([
                'message' => 'Category updated successfully',
                'data' => new PostCategoryResource($category)
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Post Category update failed',
                'error' => $th->getMessage()
            ], 500);
        }
       

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = PostCategory::find($id);
        if (!$category) {
            return response()->json([
                'message' => 'Category not found',
            ], 404);
        }
        try {
            $category->delete();
            return response()->json([
                'message' => 'Category deleted successfully',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Category deletion failed',
                'error' => $th->getMessage()
            ], 500);
        }

    }
}
