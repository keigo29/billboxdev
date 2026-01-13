'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
// 新規登録
export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
    
        try {
            // Supabase 認証 (email & password)
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: email,
                password: password
            });
    
            if (signUpError) {
                setError(signUpError.message);
                return;
            }
    
            const user = data.user;
    
            if (!user) {
                setError('ユーザーの作成に失敗しました');
                return;
            }
    
            console.log("User ID:", user.id);  // 確認用
    
            // ユーザープロファイルを保存
            const { error: profileError } = await supabase
                .from('users')
                .insert([
                    {
                        id: user.id,  // `auth.users` の `id` をセット
                        name: name,
                        email: email,
                        is_premium: false,
                        plan_start_date: null,
                        plan_end_date: null
                    }
                ]);
    
            if (profileError) {
                console.error("Profile Insert Error:", profileError);
                setError('プロフィールの作成に失敗しました');
                return;
            }
    
            setSuccess(true);
            setTimeout(() => router.push('/dashboard'), 2000);
    
        } catch (err) {
            setError('エラーが発生しました');
        }
    };
    

    return (
        <div>
            <h1>アカウント登録</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        名前:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        メールアドレス:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        パスワード:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>サインアップに成功しました！</p>}
                    <br />
                    <button type="submit">新規登録</button>
                </form>
            </div>
            <Link href="/">アカウントをすでにお持ちの方</Link>
        </div>
    );
}
