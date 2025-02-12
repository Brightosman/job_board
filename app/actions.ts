"use server"

import { redirect } from "next/navigation";
import { prisma } from "./utils/db";
import requireUser from "./utils/requireUser"
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchemas"
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

// export async function AAcreateJob(data: z.infer<typeof jobSchema>) {
//   const user = await requireUser();

//   const validatedData = jobSchema.parse(data);

// //   const company = await prisma.company.findUnique({
// //     where: {
// //       userId: user.id,
// //     },
// //     select: {
// //       id: true,
// //       user: {
// //         select: {
// //           stripeCustomerId: true,
// //         },
// //       },
// //     },
// //   });

// //   if (!company?.id) {
// //     return redirect("/");
// //   }

// //   let stripeCustomerId = company.user.stripeCustomerId;

// //   if (!stripeCustomerId) {
// //     const customer = await stripe.customers.create({
// //       email: user.email!,
// //       name: user.name || undefined,
// //     });

// //     stripeCustomerId = customer.id;

// //     // Update user with Stripe customer ID
// //     await prisma.user.update({
// //       where: { id: user.id },
// //       data: { stripeCustomerId: customer.id },
// //     });
// //   }

//   const jobPost = await prisma.jobPost.create({
//     data: {
//       companyId: company.id,
//       jobDescription: validatedData.jobDescription,
//       jobTitle: validatedData.jobTitle,
//       employmentType: validatedData.employmentType,
//       location: validatedData.location,
//       salaryFrom: validatedData.salaryFrom,
//       salaryTo: validatedData.salaryTo,
//       listingDuration: validatedData.listingDuration,
//       benefits: validatedData.benefits,
//     },
//   });

//   // Trigger the job expiration function
//   await inngest.send({
//     name: "job/created",
//     data: {
//       jobId: jobPost.id,
//       expirationDays: validatedData.listingDuration,
//     },
//   });

//   // Get price from pricing tiers based on duration
//   const pricingTier = jobListingDurationPricing.find(
//     (tier) => tier.days === validatedData.listingDuration
//   );

//   if (!pricingTier) {
//     throw new Error("Invalid listing duration selected");
//   }

//   const session = await stripe.checkout.sessions.create({
//     customer: stripeCustomerId,
//     line_items: [
//       {
//         price_data: {
//           product_data: {
//             name: `Job Posting - ${pricingTier.days} Days`,
//             description: pricingTier.description,
//             images: [
//               "https://pve1u6tfz1.ufs.sh/f/Ae8VfpRqE7c0gFltIEOxhiBIFftvV4DTM8a13LU5EyzGb2SQ",
//             ],
//           },
//           currency: "EUR",
//           unit_amount: pricingTier.price * 100, // Convert to cents for Stripe
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     metadata: {
//       jobId: jobPost.id,
//     },
//     success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
//     cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
//   });

//   return redirect(session.url as string);
// }

export async function createJob(data: z.infer<typeof jobSchema>) {
  const user = await requireUser();

  const validatedData = jobSchema.parse(data);

  const company= await prisma.company.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    }
  })

  if (!company?.id) {
    return redirect("/");
  }


  const jobPost = await prisma.jobPost.create({
    data: {
      companyId: company.id,
      jobDescription: validatedData.jobDescription,
      jobTitle: validatedData.jobTitle,
      employmentType: validatedData.employmentType,
      location: validatedData.location,
      salaryFrom: validatedData.salaryFrom,
      salaryTo: validatedData.salaryTo,
      listingDuration: validatedData.listingDuration,
      benefits: validatedData.benefits,
    },
  });

  return redirect("/");

}