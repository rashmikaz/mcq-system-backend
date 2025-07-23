import { PrismaClient } from "@prisma/client";
import { Question } from "../model/Question";

const prisma = new PrismaClient();

export async function questionSave(q: Question) {
    try {
        const newQuestion = await prisma.question.create({
            data: {
                examId: q.examId,
                question_text: q.question_text,
                option_a: q.option_a,
                option_b: q.option_b,
                option_c: q.option_c,
                option_d: q.option_d,
                correct_option: q.correct_option
            }
        });
        console.log("Question added:", newQuestion);
        return newQuestion;
    } catch (err) {
        console.error("Error adding question:", err);
        throw err;
    }
}
