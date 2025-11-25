import { redirect } from 'next/navigation';

// Redirect old /about to /vi/about
export default function AboutRedirect() {
  redirect('/vi/about');
}
