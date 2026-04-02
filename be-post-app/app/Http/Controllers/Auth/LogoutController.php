<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class LogoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
      
    // 3. Buat manual cookie penghapusan
    // Parameter: name, value, minutes, path, domain, secure, httpOnly
    $cookie = cookie('laravel_session', null, -1, '/', config('session.domain'), false, true);
    $xsrfCookie = cookie('XSRF-TOKEN', null, -1, '/', config('session.domain'), false, false);
        return response()->json([
            "message" => "Logout success"
        ])->withCookie($cookie)
        ->withCookie($xsrfCookie);

    }
}
