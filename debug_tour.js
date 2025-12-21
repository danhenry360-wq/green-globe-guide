
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://wtwruzxvkzlihisqvzlz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0d3J1enh2a3psaWhpc3F2emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDA3ODgsImV4cCI6MjA3ODk3Njc4OH0.hx542i65b8Lwwqg9RfAC2-boWFt-3q8mY3Ah2PcTbIQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkSchema() {
    console.log("Checking columns of 'tours' table...");
    // We can't query schema directly, but we can query one row and check keys
    const { data, error } = await supabase
        .from('tours')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error:", error);
        return;
    }

    if (data && data.length > 0) {
        console.log("Columns found:", Object.keys(data[0]));
    } else {
        console.log("No data in table.");
    }
}

checkSchema();
