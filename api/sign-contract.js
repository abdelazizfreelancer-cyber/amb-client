import { supabaseAdmin, getRequestUser } from './_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = await getRequestUser(req);
  if (!user) return res.status(401).json({ error: 'غير مسجل دخول' });

  const { signatureDataUrl } = req.body || {};
  if (!signatureDataUrl) return res.status(400).json({ error: 'مفيش توقيع' });

  const supabase = supabaseAdmin();

  // نتأكد إن العقد موجود، ولسه في انتظار التوقيع (مش موقّع قبل كده)
  const { data: contract, error: fetchErr } = await supabase
    .from('contracts')
    .select('id, status')
    .eq('user_id', user.id)
    .maybeSingle();

  if (fetchErr) return res.status(500).json({ error: fetchErr.message });
  if (!contract) return res.status(404).json({ error: 'مفيش عقد لسه متفعّل' });
  if (contract.status === 'signed') return res.status(400).json({ error: 'العقد ده اتوقع بالفعل' });

  const { error: updateErr } = await supabase
    .from('contracts')
    .update({ status: 'signed', signature_data_url: signatureDataUrl, signed_at: new Date().toISOString() })
    .eq('user_id', user.id);

  if (updateErr) return res.status(500).json({ error: updateErr.message });
  return res.status(200).json({ ok: true });
}
