import {z} from 'zod'

export const companySchema = z.object({
    name: z.string().min (2, 'company must be at least 2 characters long'),
    location: z.string().min (1, 'Location must be defined'),
    about: z.string().min (10, "Please provide some information about your company"),
    logo: z.string().optional(),
    website: z.string().optional(),
    xAccount: z.string().optional(),
})

export const jobSeekerSchema = z.object({
    name: z.string().min (2, 'Name must be at least 2 characters'),
    about: z.string().min (10, 'Please provide more information about yourself'),
    resume: z.string().min (1, 'Please upload your resume'),
})