import {PrismaClient} from "@prisma/client"
import {User} from "../model/User"

const prisma =new PrismaClient();

export async function userSave(u:User) {
    try {
        const newUser = await prisma.user.create({
            data: {
                id: u.id,
                name: u.name,
                email: u.email

            }
        })
        console.log('User Added :',newUser)
    }catch (err) {
        console.log("error adding user", err);

    }

}