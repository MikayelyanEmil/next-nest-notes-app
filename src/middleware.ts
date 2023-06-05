import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  if (!token) {
    console.log('Not authenticated');
    
    return NextResponse.redirect(new URL('/signup', request.url));
  }
  else console.log(token);

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
};