export default function ProjectSlugPage({ params }: any) {
  return (
    <div style={{ padding: 40 }}>
      <h1>PROJECT DETAIL PAGE</h1>
      <p>Slug: {params.slug}</p>
    </div>
  );
}
