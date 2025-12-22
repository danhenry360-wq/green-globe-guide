export interface BlogPostSection {
    title: string;
    icon: string;
    content: string;
    variant?: "default" | "accent" | "gold" | "warning";
}

export interface BlogPostContent {
    introduction: string;
    disclaimer: string;
    sections: BlogPostSection[];
    safetyTips: string[];
}

export interface BlogPost {
    id: string;
    title: string;
    subtitle: string;
    excerpt: string;
    date: string;
    readTime: string;
    author: string;
    avatar: string;
    category: string;
    tags: string[];
    image: string;
    content: BlogPostContent;
    isExternalPage?: boolean;
    externalUrl?: string;
}
