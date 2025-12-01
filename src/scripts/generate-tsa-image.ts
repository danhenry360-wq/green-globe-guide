import { supabase } from "@/integrations/supabase/client";

async function generateTSAImage() {
  try {
    console.log("Generating TSA blog image...");
    
    const prompt = "Create a professional, photorealistic image of a modern airport TSA security checkpoint. Show the security screening area with X-ray machines, metal detectors, and TSA signage in the background. The scene should convey the serious, official nature of airport security with clean lines, professional lighting, and a focus on the security checkpoint area. Include TSA blue color scheme elements. No people visible. High quality, editorial photography style, 16:9 aspect ratio.";
    
    const { data, error } = await supabase.functions.invoke('generate-blog-image', {
      body: { prompt }
    });

    if (error) {
      console.error("Error generating image:", error);
      return;
    }

    if (!data?.imageUrl) {
      console.error("No image URL returned");
      return;
    }

    console.log("Image generated successfully!");
    console.log("Base64 data length:", data.imageUrl.length);
    
    // Extract base64 data and save instructions
    console.log("\nTo save this image:");
    console.log("1. Copy the base64 data from the console");
    console.log("2. Use an online base64 to image converter");
    console.log("3. Save as: public/blog-tsa-security.jpg");
    
    return data.imageUrl;
  } catch (error) {
    console.error("Script error:", error);
  }
}

// Run the script
generateTSAImage();
