'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                // 未ログインならログインページへリダイレクト
                router.push('/login');
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="dashboard/addBill">新規登録</Link><br/>
      <Link href="dashboard/showBill">請求書一覧</Link>
      <div>ガントチャート</div>
      <div>直近todo</div>
    </div>
  );
}
  