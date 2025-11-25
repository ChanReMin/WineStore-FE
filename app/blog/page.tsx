import { redirect } from 'next/navigation';

// Redirect old /blog to /vi/blog
export default function BlogRedirect() {
  redirect('/vi/blog');
}
