import express from "express";
import {User} from "../model/User";
import {userSave} from "../database/User-data-store";

const router = express.Router();

router.post('/add',async (req,res,next)=>{
    console.log(req.body);

    const user: User= req.body;
    try{
        const addedUser = await userSave(user);
        res.send('User Added')
    }catch(err){
        console.log("error adding user", err);
        res.status(400).send("error adding user");
    }
})

export default router;