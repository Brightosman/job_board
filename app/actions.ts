"use server"

import { redirect } from "next/navigation";
import { prisma } from "./utils/db";
import requireUser from "./utils/requireUser"
import { companySchema, jobSeekerSchema } from "./utils/zodSchemas"
import {z} from "zod"

export async function createCompany(data: z.infer<typeof companySchema>){
    const session = await requireUser();

    const validateData=companySchema.parse(data);
    await prisma.user.update({
        where:{
            id: session.id,
        },
        data:{
            onboardingCompleted: true,
            userType: "COMPANY",
            company:{
                create:{
                    ...validateData,
                }
            }
        }
    })

    return redirect("/")
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>){
    const user = await requireUser();
    const validateData=jobSeekerSchema.parse(data);
    await prisma.user.update({
        
        where: {
            id: user.id as string
        },
        data:{
            onboardingCompleted: true,
            userType: "JOB_SEEKER",
            jobSeeker: {
                create:{
                    ...validateData,
                }
            }

        }
    })

    return redirect("/")
}