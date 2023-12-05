// protecting our routes
import { withAuth } from 'next-auth/middleware';

export default withAuth;

//protect the following pages
export const config = {
  matcher: ['/chat', '/chat/:id', '/register'],
};
