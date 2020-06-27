const userInfoModel = require('./userInfoModel');

class userInfoController{

    static async userInfo(req,res){
        try{
            if(req.body =='' || req.body == null || req.body == undefined){
                res.status(400).json({
                    status : 'error',
                    error :'Body Parameters Missing'
                })
            }else{
                const user = new userInfoModel(req.body);
                await user.save().then(response =>{
                    if(!response){
                        res.status(404).json({
                            status : 'error',
                            error  : 'User Not Created'
                        })
                    }else{
                        res.status(200).json({
                            status : 'success',
                            message : 'User created successfully',
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

    static async login(req,res){
       
        try{
            if(req.body == '' || req.body == null || req.body == undefined){
                res.status(400).json({
                    status : 'error',
                    error :'Body Parameters Missing'
                })
            }else{
                userInfoModel.findOne({_id:req.body.id}).then(response=>{
                   
                    if(!response){
                        res.status(404).json({
                            status :'error',
                            error : 'Data Not Found'
                        })
                    }else{
                        if(req.body.userName === response.userName && req.body.pass === response.pass){
                            res.status(200).json({
                                status : 'success',
                                message : 'Login successfully',
                                response : response
                            })
                        }else{
                           
                            res.send({
                                status :'error',
                                error : 'User Name or password Incorrect'
                            })  
                        }
                    }
                }).catch(error=>{
                  
                    res.status(501).json({
                        status : 'error',
                        error : 'Something went wrong'
                    })
                })
            }
        }catch(error){
          
            res.status(500).json({
                status:'error',
                error : 'Internal Server Error'
            })
        }
    }
}

module.exports = userInfoController