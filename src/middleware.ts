import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/']);

//middleware for authentication to protect routes
export default clerkMiddleware(async(auth, req) => {
  if (!isPublicRoute(req) ) {
    //protect routes
    await auth.protect();
  }else if((await auth()).userId){
    //redirect to dashboard/categories if user is logged in
    return Response.redirect(new URL('/dashboard/categories', req.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};