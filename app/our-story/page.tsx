import { redirect } from 'next/navigation';

// Redirect old /our-story to /vi/our-story
export default function OurStoryRedirect() {
  redirect('/vi/our-story');
}
