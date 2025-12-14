export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      {children}
    </section>
  );
}
