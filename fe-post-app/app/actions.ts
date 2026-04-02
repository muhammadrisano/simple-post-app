'use server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

export async function sessionLogin() {
       const sessionId = crypto.randomUUID();
       
  (await cookies()).set('session_id', sessionId, {
      httpOnly: true,     // Aman dari serangan XSS (JS tidak bisa baca)
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',
      path: '/',          // Bisa diakses di semua halaman
    });
  
}

export async function sessionLogout() {
  (await cookies()).delete('session_id');
}