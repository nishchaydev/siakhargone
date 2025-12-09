import { fetchStrapi, fetchStrapiSafe, getStrapiMedia } from "@/lib/strapi";
import AboutPageClient from "./AboutPageClient";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function AboutPage() {
  const [aboutRes, principalRes, directorRes, homeRes] = await Promise.all([
    fetchStrapiSafe("about", "populate=*"),
    fetchStrapiSafe("principal-message", "populate=*"),
    fetchStrapiSafe("director-message", "populate=*"),
    fetchStrapiSafe("homepage", "populate[stats]=*"),
  ]);

  const about = aboutRes?.data?.attributes || {};
  const principal = principalRes?.data?.attributes || {};
  const director = directorRes?.data?.attributes || {};
  const home = homeRes?.data?.attributes || {};

  const aboutContent = about.mainDescription || "";

  const schoolImage = about.mainImage?.data
    ? {
      src: getStrapiMedia(about.mainImage.data.attributes.url),
      alt: about.mainImage.data.attributes.alternativeText || "School Image",
    }
    : null;

  const principalMessage = {
    name: principal.name,
    role: principal.role || "Principal",
    message: principal.message,
    image: principal.image?.data
      ? getStrapiMedia(principal.image.data.attributes.url)
      : null,
  };

  const chairmanMessage = {
    name: director.name,
    role: director.role || "Director",
    message: director.message,
    image: director.image?.data
      ? getStrapiMedia(director.image.data.attributes.url)
      : null,
  };

  const statItems =
    home?.stats?.map((s: any) => ({
      label: s.label,
      value: s.value,
      suffix: s.suffix,
    })) || [];

  return (
    <AboutPageClient
      principalMessage={principalMessage}
      chairmanMessage={chairmanMessage}
      achievementItems={[]}
      statItems={statItems}
      schoolImage={schoolImage}
      aboutContent={aboutContent}
      isLoading={false}
    />
  );
}
