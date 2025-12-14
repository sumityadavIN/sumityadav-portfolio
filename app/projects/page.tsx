import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/fetch";
import { projectsQuery } from "@/sanity/lib/queries";

type Project = {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
};

export default async function ProjectsPage() {
  const projects: Project[] = await sanityFetch({
    query: projectsQuery,
  });

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <header className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-gray-600">
          A selection of things I’ve built and worked on.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="text-gray-600">No projects yet.</p>
      ) : (
        <ul className="space-y-10">
          {projects.map((project) => (
            <li key={project._id}>
              <h2 className="text-2xl font-semibold">
                {project.title}
              </h2>

              {project.summary && (
                <p className="mt-2 text-gray-600">
                  {project.summary}
                </p>
              )}

              {/* Future-proof link */}
              <Link
                href={`/projects/${project.slug}`}
                className="mt-2 inline-block underline text-sm"
              >
                View details →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
