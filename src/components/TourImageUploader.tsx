import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TourImageUploaderProps {
    tourId: string;
    currentImages: string[];
    onImagesUpdate: (newImages: string[]) => void;
}

export const TourImageUploader = ({ tourId, currentImages, onImagesUpdate }: TourImageUploaderProps) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${tourId}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('tour-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('tour-images')
                .getPublicUrl(filePath);

            const newImages = [...(currentImages || []), publicUrl];

            const { error: updateError } = await supabase
                .from('tours')
                .update({ images: newImages })
                .eq('id', tourId);

            if (updateError) throw updateError;

            onImagesUpdate(newImages);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
            // Reset input
            event.target.value = '';
        }
    };

    return (
        <div className="mt-4 p-4 border border-dashed border-accent/30 rounded-lg bg-accent/5">
            <h3 className="text-sm font-bold text-accent mb-3 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Add Your Photos
            </h3>

            <div className="flex flex-col items-center gap-4">
                <label className="cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                    />
                    <Button
                        variant="outline"
                        disabled={isUploading}
                        className="bg-accent/10 hover:bg-accent/20 border-accent/30 text-accent"
                        asChild
                    >
                        <span>
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Photo
                                </>
                            )}
                        </span>
                    </Button>
                </label>
                <p className="text-xs text-muted-foreground text-center">
                    Share your experience! Uploaded photos will appear in the gallery.
                </p>
            </div>
        </div>
    );
};
