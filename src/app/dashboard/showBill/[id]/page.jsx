'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

export default function Invoice() {
    const { id } = useParams();
    const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(()=>{
        if(!id) return;

        const fetchBill = async () => {
            try{
                const response = await fetch(`/api/getInvoice?id=${id}`)
                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.error);
                }
               
                setBill(data);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false)
            };

           
        }
        fetchBill();
    },[id])
    
  if (error) return <p>Error: {error}</p>;
  if (!bill) return <p>No bill found</p>;
    return (
        <div>
            <h1>請求書</h1>
            <p><strong>ID:</strong> {bill.id}</p>
            <p><strong>Amount:</strong> {bill.billing_amount}</p>
            <p><strong>Deadline:</strong> {bill.deadline}</p>
            <p><strong>Name:</strong> {bill.bill_name}</p>
            <p><strong>Quantity:</strong> {bill.bill_quantity}</p>

        </div>
    );
}
  