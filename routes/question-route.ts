import express from "express";
import { questionSave } from "../database/Question-data-store";
import { PrismaClient } from "@prisma/client";
import { getQuestionsByExamId } from "../database/Question-data-store";
const prisma = new PrismaClient();
const router = express.Router();

// Add a new question
router.post("/add", async (req, res) => {
    const question = req.body;
    try {
        const saved = await questionSave(question);
        res.status(201).json({ message: "Question added", question: saved });
    } catch (err) {
        res.status(500).json({ message: "Failed to add question" });
    }
});

// Get all questions for an exam
router.get("/exam/:examId", async (req, res) => {
    const examId = parseInt(req.params.examId);
    try {
        const questions = await getQuestionsByExamId(examId);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch questions" });
    }
});

export default router;
