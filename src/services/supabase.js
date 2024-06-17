import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://fuwgcnygoktleltknymx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1d2djbnlnb2t0bGVsdGtueW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2MTA4ODcsImV4cCI6MjAzNDE4Njg4N30.n9xzz2s2cbcnCO0wIVvGoHLz7VfayxtagsHzG1UckoA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
