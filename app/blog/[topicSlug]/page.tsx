import { redirect } from 'next/navigation';

export default function TopicPage({
  params,
}: {
  params: { topicSlug: string }
}) {
  // Redirect to the main blog page with topic query parameter
  redirect(`/blog?topic=${params.topicSlug}`);
}