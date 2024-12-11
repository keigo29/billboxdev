"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ShowBill() {
    const [bills, setBills] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getBills`);
                if(!res.ok) {
                    throw new Error('Failed to fetch data')
                }
                const data = await res.json()
                setBills(data);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading) return <p>データ取得中...</p>;
    if(error) return <p> Error: {error}</p>;
    return (
        <div>
        <h1>請求書一覧</h1>
       {bills.length===0 ? (
        <p>請求書がありません。</p>
       ):(
        <ul>
        {bills.map((bill)=>(
            <li key={bill.id}>
                <Link href={`/dashboard/showBill/${bill.id}`}
                >
                <h2>{bill.bill_name} 御中</h2>
                <h2>{bill.billing_amount}円</h2>
                <p>{bill.creation_date}</p>
                </Link>
            </li>
        ))}
        </ul>
       )}
       </div>
    );
}
  