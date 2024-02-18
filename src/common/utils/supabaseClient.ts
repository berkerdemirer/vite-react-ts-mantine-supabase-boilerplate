import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mgotfvdetpyqhvoftwjn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nb3RmdmRldHB5cWh2b2Z0d2puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4NDY2NzgsImV4cCI6MjAyMTQyMjY3OH0.t8tbf3A1OgiXGzgsO24wam3psCm-EjH1p7yzRUNkzSo";
export const supabase = createClient(supabaseUrl, supabaseKey);
