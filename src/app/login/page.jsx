'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const router = useRouter(); // 修正: `Router` → `router`

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (signInError) {
                setError(signInError.message);
                return;
            }

            setSuccess(true);
            setTimeout(() => router.push('/dashboard'), 2000); // 修正: `Router` → `router`
        } catch (error) {
            setError('エラーが発生しました');
        }
    };

    return (
        <div>
            <h1>ログイン</h1>
            <div>
                <form onSubmit={handleSubmit}>
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
                    {success && <p style={{ color: 'green' }}>ログインに成功しました！</p>}
                    <br />
                    <button type="submit">ログイン</button>
                </form>
            </div>
            <Link href="/signup">新規アカウント登録はこちら</Link>
        </div>
    );
}
