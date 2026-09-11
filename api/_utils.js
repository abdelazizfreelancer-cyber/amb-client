import { createClient } from '@supabase/supabase-js';

export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL || "https://ikzejyosymihahfliesl.supabase.co";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("مفتاح SUPABASE_SERVICE_ROLE_KEY غير موجود في متغيرات Vercel");
  return createClient(url, key);
}

// بيتأكد إن الشخص اللي بيبعت الطلب فعلاً مسجل دخول، ويرجع بياناته
export async function getRequestUser(req) {
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '');
  if (!token) return null;

  const supabase = supabaseAdmin();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}
