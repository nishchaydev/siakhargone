import { loadAboutData, loadMessage } from "@/lib/content";
import AboutPageClient from "./AboutPageClient";

export const dynamic = "force-static";


export default async function AboutPage() {
  const aboutData = await loadAboutData();
  const principalMessage = await loadMessage('principal-message');
  const directorMessage = await loadMessage('director-message');

  // Home stats - Since we don't have local stats file yet, we'll pass empty or Mock for now to avoid crash?
  // Or we can check if "home" folder has anything. 
  // User didn't specify stats source. I will leave it empty as per "Local Content Only" rule.
  const statItems: any[] = [];

  return (
    <AboutPageClient
      principalMessage={principalMessage}
      chairmanMessage={directorMessage}
      achievementItems={[]}
      statItems={statItems}
      schoolImage={aboutData.schoolImage}
      aboutContent={aboutData.content}
      isLoading={false}
    />
  );
}

