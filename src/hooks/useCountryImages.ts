import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CountryImage {
  name: string;
  slug: string;
  image_url: string | null;
}

export const useCountryImages = () => {
  return useQuery({
    queryKey: ["country-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("countries")
        .select("name, slug, image_url")
        .not("image_url", "is", null);
      
      if (error) throw error;
      
      // Create a map of slug -> image_url for quick lookup
      const imageMap: Record<string, string> = {};
      data?.forEach((country: CountryImage) => {
        if (country.image_url) {
          // Map by both slug and name for flexible lookups
          imageMap[country.slug] = country.image_url;
          imageMap[country.name.toLowerCase().replace(/\s+/g, '-')] = country.image_url;
          imageMap[country.name] = country.image_url;
        }
      });
      
      return imageMap;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

// Helper to get image URL with fallback
export const getCountryImageUrl = (
  imageMap: Record<string, string> | undefined,
  countryName: string,
  fallbackUrl?: string
): string => {
  if (!imageMap) return fallbackUrl || "";
  
  // Try various lookup keys
  const slug = countryName.toLowerCase().replace(/\s+/g, '-');
  return imageMap[countryName] || imageMap[slug] || fallbackUrl || "";
};
