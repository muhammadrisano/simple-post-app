<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $posts = Post::latest()->get();
       return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category_id' => 'required|exists:post_categories,id',
        ]);
        try {
            $data['user_id'] = $request->user()->id;
            $data['slug'] = Str::slug($data['title']);
            $post = Post::create($data);
            return response()->json([
                'message' => 'Post created successfully',
                'data' => new PostResource($post)
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Post creation failed',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $post = Post::where(['slug' => $slug])->first();
        if (!$post) {
            return response()->json([
                'message' => 'Post not found',
            ], 404);
        }
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $slug)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category_id' => 'required|exists:post_categories,id',
        ]);
        $post = Post::where(['slug' => $slug])->first();
        if (!$post) {
            return response()->json([
                'message' => 'Post not found',
            ], 404);
        }
        try {
            $post->update($data);
            return response()->json([
                'message' => 'Post updated successfully',
                'data' => new PostResource($post)
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Post update failed',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        $post = Post::where(['slug' => $slug])->first();
        if (!$post) {
            return response()->json([
                'message' => 'Post not found',
            ], 404);
        }
        try {
           $post->delete();
           return response()->json([
                'message' => 'Post deleted successfully',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Tololist delete failed"
            ], 500);
        }
    }
}
