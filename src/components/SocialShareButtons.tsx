import { Facebook, Twitter, Linkedin, Link2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
    url: string;
    title: string;
    description?: string;
    className?: string;
}

export const SocialShareButtons = ({
    url,
    title,
    description = "",
    className = ""
}: SocialShareButtonsProps) => {
    const { toast } = useToast();
    
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast({
                title: "Link Copied!",
                description: "The link has been copied to your clipboard.",
            });
        } catch (error) {
            toast({
                title: "Failed to copy",
                description: "Please copy the URL manually.",
                variant: "destructive",
            });
        }
    };

    const openShareWindow = (shareUrl: string) => {
        window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span className="text-sm text-muted-foreground mr-1">Share:</span>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => openShareWindow(shareLinks.facebook)}
                className="h-8 w-8 rounded-full hover:bg-blue-500/20 hover:text-blue-500"
                aria-label="Share on Facebook"
            >
                <Facebook className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => openShareWindow(shareLinks.twitter)}
                className="h-8 w-8 rounded-full hover:bg-sky-500/20 hover:text-sky-500"
                aria-label="Share on Twitter"
            >
                <Twitter className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => openShareWindow(shareLinks.linkedin)}
                className="h-8 w-8 rounded-full hover:bg-blue-600/20 hover:text-blue-600"
                aria-label="Share on LinkedIn"
            >
                <Linkedin className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={() => window.location.href = shareLinks.email}
                className="h-8 w-8 rounded-full hover:bg-accent/20 hover:text-accent"
                aria-label="Share via Email"
            >
                <Mail className="h-4 w-4" />
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyLink}
                className="h-8 w-8 rounded-full hover:bg-accent/20 hover:text-accent"
                aria-label="Copy link"
            >
                <Link2 className="h-4 w-4" />
            </Button>
        </div>
    );
};
