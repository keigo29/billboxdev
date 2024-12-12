'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet ,PDFDownloadLink } from "@react-pdf/renderer";
import supabase from '@/lib/supabaseClient';


const styles = StyleSheet.create({
    page: {
        padding: 20,
        flexDirection: 'column',
      },
      title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
      },
      billItem: {
        marginBottom: 10,
        padding: 10,
        borderBottom: '1px solid #ccc',
      },
      billText: {
        fontSize: 12,
        marginBottom: 5,
      }
});
 
function BillPDF({ bill }){
    return(
        <Document>
            <Page>
                <Text>請求書一覧</Text>
            </Page>
        </Document>
    )
}

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
                <PDFDownloadLink
                    document={<BillPDF bill={bill}/>}
                    fileName={`${bill.billing_amount}_${bill.deadline}.pdf`}
                >
                        {({ loading }) => loading ? 'PDFを準備中...' : '請求書一覧をPDFでダウンロード' ``````}
                </PDFDownloadLink>
        </div>
    );
}
  