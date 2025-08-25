import { createClient } from '@/lib/supabase/server';

export default async function fetchCompanies() {
    const supabase = await createClient();
    const { data, error} = await supabase.from("certified-companies").select();

    if (error) {
        console.error("Error fetching companies:", error.message);
        return null; // or throw error
    }

    return data;
}
