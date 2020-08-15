import express from 'express'
import User from '../models/usermodel'
import { getToken, isAuth } from '../utils'
import multer from 'multer';
import sharp from 'sharp';
const router = express.Router();

router.put('/:id',isAuth,async(req,res)=>{
    const userId = req.params.id;
    const user = await User.findById(userId)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
        const updateUser = await user.save();
        res.send({
            _id:updateUser.id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
            token:getToken(updateUser)
        })
        
    } else {
        res.status(404).send({message:'User not found'})
    }
})


router.post('/signin', async(req,res) => {
    const signinuser = await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if(signinuser){
        res.send({
            _id:signinuser.id,
            name:signinuser.name,
            email:signinuser.email,
            isAdmin:signinuser.isAdmin,
            token:getToken(signinuser)
        })
    } else{
        res.status(401).send({error: 'Invalid Credentials'})
    }
})
router.post('/register',async(req,res)=>{
    try{
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })

        const newUser = await user.save()
        if(newUser){
            res.send({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                password:newUser.password,
                token:getToken(newUser)
            })
        }
    } catch(e){
        res.status(404).send(e)
    }

})

router.get("/createadmin", async (req,res) => {
   try{
    const user = new User({
        name:'yash wandhare',
        email: 'yashwandhare1234@gmail.com',
        password: 'Pass123@#',
        isAdmin:true
    })

    const newUser = await user.save()

    res.send(newUser)
    } catch(e){
        res.status(400).send(e)
    }
})

const upload = multer({
    limits : {
        fileSize : 5000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('this file in not compatible'))
        }
        cb(undefined,true)
    }
})
router.post('/mine/avatar',isAuth,upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:1000,height:1000}).png().toBuffer()
    await req.user.save()
    res.send({
        avatar:buffer,
        token:getToken(buffer)
    })
},(error,req,res,next) =>{
    res.status(400).send({error:error.message})
})

export default router