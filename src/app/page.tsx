import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Gallery, Impact, Location, Process, Wash } from "@/components/Sections";
import { TestimonialsCTA } from "@/components/TestimonialsCTA";
import { site } from "@/config/site";

export default function Home() {
  const dados = {
    "@context": "https://schema.org", "@type": ["AutoRepair", "AutoWash", "AutoPartsStore"],
    name: site.nome, telephone: "+5598987430111", hasMap: site.mapa, sameAs: [site.instagram],
    address: { "@type": "PostalAddress", streetAddress: site.endereco, addressLocality: "Paço do Lumiar", addressRegion: "MA", postalCode: site.cep, addressCountry: "BR" },
    geo: { "@type": "GeoCoordinates", latitude: -2.5394867, longitude: -44.1707284 },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:30", closes: "17:00" }],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }} /><Hero /><Services compacto /><Impact /><TestimonialsCTA /><Gallery /><Process /><Wash /><Location /></>;
}
