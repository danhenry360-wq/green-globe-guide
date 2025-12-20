
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://wtwruzxvkzlihisqvzlz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0d3J1enh2a3psaWhpc3F2emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MDA3ODgsImV4cCI6MjA3ODk3Njc4OH0.hx542i65b8Lwwqg9RfAC2-boWFt-3q8mY3Ah2PcTbIQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkDispensaries() {
    console.log("Checking dispensaries in Colorado...");
    const { data, error } = await supabase
        .from('dispensaries')
        .select('name, city, state')
        .eq('state', 'Colorado')
        .limit(100);

    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log("Found " + data.length + " dispensaries in Colorado.");
    const cities = new Set(data.map(d => d.city));
    console.log("Cities found:", Array.from(cities));

    const gardenCityDispensaries = data.filter(d => d.city && d.city.toLowerCase().includes('garden'));
    console.log("Garden City dispensaries found:", gardenCityDispensaries);
}

checkDispensaries();
