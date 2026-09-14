import { createFileRoute, Link } from "@tanstack/react-router";
import { TopicPage } from "@/components/topic-page";
import { PageWidth, Shell } from "@/components/layout";
import { getTopic } from "@/lib/content";

export const Route = createFileRoute("/topics/$slug")({
  component: TopicRoute,
});

function TopicRoute() {
  const { slug } = Route.useParams();
  const topic = getTopic(slug);
  if (!topic) {
    return (
      <Shell>
        <PageWidth className="py-16">
          <h1 className="font-display text-3xl font-semibold">Chapter not found</h1>
          <p className="mt-2 text-muted">That slug is not in the seven-topic syllabus.</p>
          <Link to="/" className="mt-4 inline-block text-accent">
            Back to the desk
          </Link>
        </PageWidth>
      </Shell>
    );
  }
  return <TopicPage topic={topic} />;
}
