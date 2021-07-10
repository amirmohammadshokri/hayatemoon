export interface ICrawlerRoute {
    id: number;
    title: string;
    saving?: boolean;
    locations: {
        id: number;
        title: string;
    }[]
}