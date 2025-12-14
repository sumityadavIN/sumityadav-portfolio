import { sanityFetch } from "@/sanity/lib/fetch";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import PortableText from "@/app/blog/portable-text";

export default async function ProjectPage({ params }: any) {
  const project = await sanityFetch({
    query: projectBySlugQuery,
    params: { slug: params.slug },
  });

  if (!project) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {project.title}
        </h1>

        {project.summary && (
          <p className="text-xl text-gray-600">
            {project.summary}
          </p>
        )}
      </header>

      {project.content && (
        <article className="prose prose-lg">
          <PortableText value={project.content} />
        </article>
      )}
    </main>
  );
}
