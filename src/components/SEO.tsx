import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "Medkour Salah Eddine – Full-Stack Developer, Cybersecurity Specialist & Writer",
  description = "Full-Stack Developer, Cybersecurity Specialist, and Writer focused on building secure, scalable web applications. Proficient in React, Next.js, Node.js, TypeScript, and security best practices.",
  image = "/images/og-image.jpg",
  url = "https://salahmed-ctrlz.github.io/salaheddine-medkour-portfolio/"
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Medkour Salah Eddine",
    jobTitle: "Full-Stack Developer, Cybersecurity Specialist & Writer",
    url: url,
    sameAs: [
      "https://github.com/salahmed-ctrlz",
      "https://www.linkedin.com/in/salah-eddine-medkour/"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Annaba",
      addressCountry: "Algeria"
    },
    email: "medkoursalaheddine@gmail.com",
    telephone: "+213551964262",
    description: description
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta
        name="keywords"
        content="full-stack development, cybersecurity, writing, React, Next.js, TypeScript, Node.js, penetration testing, secure applications"
      />
      <meta name="author" content="Medkour Salah Eddine" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}
