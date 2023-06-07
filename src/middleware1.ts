// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get('access_token')?.value;
//   if (!token) {
//     console.log('Not authenticated');
//     return NextResponse.redirect(new URL('/signup', request.url));
//   }
//   else {
//     try {
//       let response = await fetch('http://localhost:3001/users/verify', {
//         method: "Get",
//         headers: {
//           "Content-Type": "Application/json",
//           "Authorization": "Bearer " + token
//         }
//       });      
//       console.log(response.ok);
//       if (response.ok) return NextResponse.redirect(new URL('/dashboard', request.url));
//       else return NextResponse.redirect(new URL('/signup', request.url));
//     } catch (error) {
//       console.log(error.message);    
//     }

//   }

// }


// export const config = {
//   matcher: '/dashboard',
// };