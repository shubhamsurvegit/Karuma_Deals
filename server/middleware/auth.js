const jwt=require('jsonwebtoken');


const auth=(req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]
        if(token){
            const isCustomAuth=token.length<500;
            let decodeData;
            if(isCustomAuth){   
                decodeData=jwt.verify(token,'test');
                req.UserId=decodeData?.id
            }
            else{
                console.log("FOR GOOGLE AUTH")
                decodeData=jwt.decode(token);
                console.log(decodeData)
                req.UserId=decodeData.sub
            }
            next();
        }
        else{
            return res.status(404).json({message:"Token Not found"})
        }
    }
    catch(err){
        return res.status(401).json({message:"Session Expired! Kindly login"})
    }
}

module.exports=auth