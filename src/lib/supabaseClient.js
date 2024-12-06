import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL または Anon Key が設定されていません。env ファイルを確認してください。');
}

// Supabase クライアントを初期化
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;