import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// POST /submit
router.post("/", async (req, res) => {
    const { userId, examId, answers } = req.body;

    if (!userId || !examId || !Array.isArray(answers)) {
        return res.status(400).json({ message: "Invalid submission format." });
    }

    try {
        let score = 0;

        // Fetch all correct answers for the exam's questions
        const questionIds = answers.map((ans: any) => ans.questionId);
        const questions = await prisma.question.findMany({
            where: {
                id: { in: questionIds },
                examId: examId,
            }
        });

        // Check answers and calculate score
        const evaluatedAnswers = answers.map((ans: any) => {
            const matchingQuestion = questions.find(q => q.id === ans.questionId);
            const isCorrect = matchingQuestion?.correct_option === ans.selected_option;
            if (isCorrect) score++;
            return {
                questionId: ans.questionId,
                selected_option: ans.selected_option,
                is_correct: isCorrect
            };
        });

        // Save Result
        const result = await prisma.result.create({
            data: {
                userId,
                examId,
                score,
            }
        });

        // Save each Answer
        for (const a of evaluatedAnswers) {
            await prisma.answer.create({
                data: {
                    resultId: result.id,
                    questionId: a.questionId,
                    selected_option: a.selected_option,
                    is_correct: a.is_correct,
                }
            });
        }

        res.status(201).json({
            message: "Exam submitted successfully",
            score,
            total: answers.length
        });

    } catch (err) {
        console.error("Error submitting exam:", err);
        res.status(500).json({ message: "Failed to submit exam" });
    }
});

export default router;
