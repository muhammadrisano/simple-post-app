<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $credential = $request->validate([
            "email" => "required|email",
            "password" => "required|min:6"
        ]);
        
        if(!Auth::attempt($credential)) {
            return response()->json([
                "message" => "invalid credentials"
            ]);
        }

        // $user = Auth::user();
        $request->session()->regenerate();


        return response()->json([
            "message" => "Login success",
            "user" => $request->user()
        ]);
    }
}
