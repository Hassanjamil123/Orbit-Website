import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <h1 className="text-hero font-bold">This page is out of orbit.</h1>
        <p className="mt-6 max-w-md text-lg text-muted">The link may be old, or the page may not exist yet.</p>
        <ButtonLink href="/" variant="primary" size="lg" className="mt-10">
          Go to the homepage
        </ButtonLink>
      </Container>
    </section>
  );
}
