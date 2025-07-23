import {PrismaClient} from "@prisma/client"
import {Exam} from "../model/Exam"
import {User} from "../model/User";

const prisma =new PrismaClient();

export async function examSave(e:Exam) {
    try {
        const newExam = await prisma.exam.create({
            data: {
                id: e.id,
                title: e.title,
                description: e.description

            }
        })
        console.log('exam Added :',newExam)
    }catch (err) {
        console.log("error adding exam", err);

    }

}