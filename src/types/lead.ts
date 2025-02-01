export enum VisaCategory {
    O1 = 'O1',
    EB1A = 'EB-1A',
    EB2NIW = 'EB-2 NIW',
    DONT_KNOW = 'I don\'t know',
}

export type Lead = {
    id: number;
    firstName: string;
    lastName: string;
    url: string;
    visaCategories: VisaCategory[];
    email: string;
    submitted: Date;
    status: 'pending' | 'reached_out' | 'contacted' | 'closed';
    resume: string;
    country: string;
};
