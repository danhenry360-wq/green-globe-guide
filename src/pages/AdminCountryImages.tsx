import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ASIAN_COUNTRIES = [
  { slug: "thailand", name: "Thailand" },
  { slug: "japan", name: "Japan" },
  { slug: "south-korea", name: "South Korea" },
  { slug: "china", name: "China" },
  { slug: "hong-kong", name: "Hong Kong" },
  { slug: "macao", name: "Macao" },
  { slug: "taiwan", name: "Taiwan" },
  { slug: "india", name: "India" },
  { slug: "nepal", name: "Nepal" },
  { slug: "sri-lanka", name: "Sri Lanka" },
  { slug: "bangladesh", name: "Bangladesh" },
  { slug: "pakistan", name: "Pakistan" },
  { slug: "indonesia", name: "Indonesia" },
  { slug: "malaysia", name: "Malaysia" },
  { slug: "singapore", name: "Singapore" },
  { slug: "philippines", name: "Philippines" },
  { slug: "vietnam", name: "Vietnam" },
  { slug: "cambodia", name: "Cambodia" },
  { slug: "laos", name: "Laos" },
  { slug: "myanmar", name: "Myanmar" },
  { slug: "brunei", name: "Brunei" },
  { slug: "timor-leste", name: "Timor-Leste" },
];

const EUROPEAN_COUNTRIES = [
  { slug: "netherlands", name: "Netherlands" },
  { slug: "germany", name: "Germany" },
  { slug: "spain", name: "Spain" },
  { slug: "italy", name: "Italy" },
  { slug: "portugal", name: "Portugal" },
  { slug: "switzerland", name: "Switzerland" },
  { slug: "austria", name: "Austria" },
  { slug: "czech-republic", name: "Czech Republic" },
  { slug: "malta", name: "Malta" },
  { slug: "luxembourg", name: "Luxembourg" },
  { slug: "belgium", name: "Belgium" },
  { slug: "france", name: "France" },
  { slug: "uk", name: "United Kingdom" },
  { slug: "ireland", name: "Ireland" },
  { slug: "denmark", name: "Denmark" },
  { slug: "finland", name: "Finland" },
  { slug: "norway", name: "Norway" },
  { slug: "sweden", name: "Sweden" },
  { slug: "iceland", name: "Iceland" },
  { slug: "poland", name: "Poland" },
  { slug: "greece", name: "Greece" },
];

export default function AdminCountryImages() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState<string | null>(null);

  const handleImageUpload = async (countrySlug: string, file: File) => {
    try {
      setUploading(countrySlug);

      // Upload to storage bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `world-${countrySlug}.${fileExt}`;
      const filePath = `country-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('dispensary-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('dispensary-images')
        .getPublicUrl(filePath);

      toast({
        title: "Image uploaded!",
        description: `${countrySlug} image uploaded successfully. Public URL: ${publicUrl}`,
      });

      // Note: In production, you would update the country_images.ts file or database here
      console.log(`Update country_images.ts with: "${countrySlug}": "${publicUrl}"`);

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  };

  const CountryImageUpload = ({ country }: { country: { slug: string; name: string } }) => (
    <Card className="p-4 bg-card/50 border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{country.name}</h3>
            <p className="text-sm text-muted-foreground">{country.slug}</p>
          </div>
        </div>
        
        <div>
          <Input
            type="file"
            accept="image/*"
            id={`upload-${country.slug}`}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(country.slug, file);
            }}
            disabled={uploading === country.slug}
          />
          <Label htmlFor={`upload-${country.slug}`}>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={uploading === country.slug}
              asChild
            >
              <span>
                <Upload className="w-4 h-4 mr-2" />
                {uploading === country.slug ? "Uploading..." : "Upload Image"}
              </span>
            </Button>
          </Label>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Button>
          
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground via-green-400 to-gold bg-clip-text text-transparent">
            Country Image Management
          </h1>
          <p className="text-muted-foreground">
            Upload unique images for Asian and European countries
          </p>
        </div>

        <Tabs defaultValue="asia" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="asia">Asian Countries ({ASIAN_COUNTRIES.length})</TabsTrigger>
            <TabsTrigger value="europe">European Countries ({EUROPEAN_COUNTRIES.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="asia" className="space-y-4">
            {ASIAN_COUNTRIES.map((country) => (
              <CountryImageUpload key={country.slug} country={country} />
            ))}
          </TabsContent>

          <TabsContent value="europe" className="space-y-4">
            {EUROPEAN_COUNTRIES.map((country) => (
              <CountryImageUpload key={country.slug} country={country} />
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
