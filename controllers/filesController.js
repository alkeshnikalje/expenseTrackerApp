const Downloads = require('../models/downloadfile');


exports.getFiles = async (req,res)=>{
    try{
        const files = await Downloads.findAll({where : {userId : req.user.id}});
        return res.json(files);
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}