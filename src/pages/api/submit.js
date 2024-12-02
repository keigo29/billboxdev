export default async function handler(req,res) {
    if(req.method === 'POST'){
        const {
            billingAmount,
            deadline,
            creationDate,
            billName,
            billNumber,
            billQuantity,
            unitPrice,
            transferTarget,
        } = req.body;
        //バリデーション必須項目チェック
        if(!billingAmount || !deadline || !billName || !billQuantity || !unitPrice || !transferTarget){
            return res.status(400).json({error:'必須項目が不足しています'})
        }
    }
}