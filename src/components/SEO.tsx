import { Helmet } from 'react-helmet-async';

import Image from "../components/images/Portraits/portrait3.webp";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "Salah Eddine Medkour – Network Engineer, Web Developer, Cybersecurity Specialist & Writer",
  description = "Network engineer and cybersecurity specialist skilled in secure web apps, penetration testing, and scalable development.",
  image = Image,
  url = "https://salahmed-ctrlz.github.io/salaheddine-medkour-portfolio/"
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Salah Eddine Medkour",
    jobTitle: "Network Engineer, Web Developer, Cybersecurity Specialist & Writer",
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
    description: "Network Engineer, Web Developer, Cybersecurity Specialist & Writer"
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
        content="network engineering, cybersecurity, web development, React, Next.js, TypeScript, Node.js, penetration testing, secure systems"
        />
      <meta name="author" content="Salah Eddine Medkour" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}
