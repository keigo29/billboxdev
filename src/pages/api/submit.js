import supabase from '@/lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            billingAmount,
            deadline,
            creationDate,
            billName,
            billNumber,
            billQuantity,
            itemId,
            unitPrice,
            transferTarget,
        } = req.body;

        if (
            !billingAmount || 
            !deadline || 
            !billName || 
            !billQuantity || 
            !unitPrice || 
            !transferTarget
        ) {
            return res.status(400).json({ error: '必須項目が不足しています' });
        }

        const billData = {
            billing_amount: billingAmount,
            deadline: deadline,
            creation_date: creationDate || new Date().toISOString(),
            bill_name: billName,
            bill_number: billNumber || null,
            bill_quantity: billQuantity,
            unit_price: unitPrice,
            transfer_target: transferTarget,
            item_id:itemId,
            created_at: new Date().toISOString(),
        };

        try {
            const { data, error } = await supabase
                .from('bills')
                .insert([billData]);

            if (error) {
                console.error('データ挿入エラー:', error);
                return res.status(500).json({ error: 'データベースへの挿入に失敗しました', details: error.message });
            }

            return res.status(200).json({ message: 'データ挿入に成功しました', data });
        } catch (err) {
            console.error('サーバーエラー:', err);
            return res.status(500).json({ error: 'サーバーエラーが発生しました', details: err.message });
        }
    } else {
        return res.setHeader('Allow', ['POST']).status(405).json({ error: 'メソッドが許可されていません' });
    }
}
