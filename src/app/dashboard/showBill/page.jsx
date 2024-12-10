"use client";
import { useEffect, useState } from 'react';

export default function ShowBill() {
    const [bills, setBills] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('api/getBills');
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
       
      </div>
    );
}
  