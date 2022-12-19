export interface SearchQuery {
    searchQuery: string;
    repoCountRequired: number;
    type: string;
    after: string | null;
    before: string | null;
}