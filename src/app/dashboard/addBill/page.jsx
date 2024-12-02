'use client'
import { useState } from 'react';

export default function AddBill() {
    const [billingAmount, setBillingAmount] = useState('');
    const [deadline, setDeadline] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [billName, setBillName] = useState('');
    const [billNumber, setBillNumber] = useState('');
    const [billQuantity, setBillQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [transferTarget, setTransferTarget] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const billData = {
            billingAmount,
            deadline,
            creationDate,
            billName,
            billNumber,
            billQuantity,
            unitPrice,
            transferTarget,
        };
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('サーバーからの応答:', result);
                alert('送信が成功しました！');
            } else {
                console.error('エラーが発生しました');
            }
        } catch (error) {
            console.error('送信中にエラーが発生しました:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>請求書編集</h2>
            <label>
                請求金額:
                <input
                    type="text"
                    value={billingAmount}
                    onChange={(e) => setBillingAmount(e.target.value)}
                    required
                />
            </label>
            <br />

            <label>
                締切日:
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                />
            </label>
            <br />

            <label>
                作成日:
                <input
                    type="date"
                    value={creationDate}
                    onChange={(e) => setCreationDate(e.target.value)}
                />
            </label>
            <br />

            <label>
                請求書番号:
                <input
                    type="text"
                    value={billNumber}
                    onChange={(e) => setBillNumber(e.target.value)}
                />
            </label>
            <br />
            <label>
                品目名:
                <input
                    type="number"
                    value={billName}
                    onChange={(e) => setBillName(e.target.value)}
                    required
                />
            </label>
            <label>
                数量:
                <input
                    type="number"
                    value={billQuantity}
                    onChange={(e) => setBillQuantity(e.target.value)}
                    required
                />
            </label>

            <label>
                単価:
                <input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    required
                />
            </label>
            <br />

            <label>
                振込先:
                <textarea
                    type="textarea"
                    value={transferTarget}
                    onChange={(e) => setTransferTarget(e.target.value)}
                    required
                />
            </label>
            <br />

            <button type="submit">保存</button>
        </form>
    );
}