const blogInfoModel = require('./blogInfoModel');

class blogInfoController{
    static async create(req,res){
        try{
            
            if(req.body === ' ' || req.body === null || req.body ===undefined){
                res.status(400).json({
                    status : 'error',
                    error :'Body Parameters Missing'
                })
            }else{
                const image={
                    contentType : req.file.mimetype,
                    data : req.file.buffer
                }
                const blog = new blogInfoModel({
                    title : req.body.title,
                    description : req.body.description,
                    image : image
                });
                await blog.save().then(response =>{
                    if(!response){
                        res.status(404).json({
                            status : 'error',
                            error  : 'Blog Not Created'
                        })
                    }else{
                        res.status(200).json({
                            status : 'success',
                            message : 'Blog created successfully',
                            response : response
                        })

                    }
                }).catch(error=>{
                    res.status(501).json({
                        status : 'error',
                        error : error
                    })
                })
            }
          
        }catch(error){
            res.status(500).json({
                status:'error',
                error : error
            })
        }
    }

    static async findAll(req,res){
        try{
            blogInfoModel.find().then(response=>{
                const blog = [];
                for(let i =0; i<response.length;i++){
                    const image = new Buffer(response[i].image.data).toString("base64");
                    const title = response[i].title;
                    const description = response[i].description;
                    const contentType = response[i].image.contentType
                    const id = response[i]._id;

                    blog.push({
                        image : `data:${contentType};base64,`+image,
                        title : title,
                        description : description,
                        id : id
                    })
                }
                res.status(200).json({
                    status : 'success',
                    response : blog
                })
            }).catch(error=>{
                res.status(501).json({
                    status : 'error',
                    error : error
                })
            })
        }catch(error){
            res.status(500).json({
                status:'error',
                error : error
            })
        }
    }

    static async update(req,res){
        try{
            if((req.body === '' || req.body === null || req.body === undefined) && (!req.file)){
                res.status(400).json({
                    status : 'error',
                    error :'Body Parameters Missing'
                })
            }else{
                if(req.file){
                    const image={
                        contentType : req.file.mimetype,
                        data : req.file.buffer
                    }
                    blogInfoModel.findByIdAndUpdate({_id : req.params._id},{
                        title : req.body.title,
                        description : req.body.description,
                        image : image
                    },{new:true}).then(response=>{
                        res.status(200).json({
                            status:'success',
                            message : ' Blog updated successfully',
                            response : response
                        })
                    }).catch(error=>{
                        
                        res.status(501).json({
                            status : 'error',
                            error : error
                        })
                    })
                }else{
                   
                    blogInfoModel.findByIdAndUpdate(req.params._id,{
                        title : req.body.title,
                        description : req.body.description,
                    },{new:true}).then(response=>{
                        res.status(200).json({
                            status : 'success',
                            message : ' Blog updated successfully',
                            response : response
                        })
                    }).catch(error=>{
                        res.status(501).json({
                            status : 'error',
                            error : error
                        })
                    }) 
                }
            }
        }catch(error){
            res.status(500).json({
                status:'error',
                error : error
            })
        }
    }

    static async delete(req,res){
         try{
            blogInfoModel.findByIdAndRemove({_id:req.params._id}).then(response=>{
                if(!response){
                    res.status(500).json({
                        status : 'error',
                        message : 'Blog is not available'
                    })
                }else{
                    res.status(200).json({
                        status : 'success',
                        message : 'blog deleted successfully',
                        response : response
                    })
                }
            }).catch(error=>{
                res.status(501).json({
                    status : 'error',
                    error : error  
                })
            })
         }catch(error){
            res.status(500).json({
                status:'error',
                error : error
            }) 
         }
    }
}

module.exports = blogInfoController