import express from "express";
import {Exam} from "../model/Exam";
import {examSave} from "../database/Exam-data-store";


const router = express.Router();

router.post('/add',async (req,res,next)=>{
    console.log(req.body);

    const exam: Exam= req.body;
    try{
        const addedExam = await examSave(exam);
        res.send('Exam Added')
    }catch(err){
        console.log("error adding exam", err);
        res.status(400).send("error adding exam");
    }
})

export default router;