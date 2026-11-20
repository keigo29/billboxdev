import supabase from '@/lib/supabaseClient';

export default async function handler(req, res){
    if ( req.method !=="GET") {
        return res.status(405).json({error:"Method Not Allowed"})
    }
    const { id } = req.query;
    try{
        const {data,error} = await supabase.from('bills').select('*').eq('id',id).single(); 

    if(error){
        return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
    }catch(err){
         return res.status(500).json({ error: err.message });
    }
    
   
    
    

}