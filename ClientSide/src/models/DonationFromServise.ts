export interface DonationFromServise {
        id: number;
        donor_id: number;
        amount: number;
        frequency: string;
        purpose: string | null;
        notes: string;
        donation_date: string;
        first_name: string;
        last_name: string;
    }