"use client"
import Image from 'next/image'
import Logo from "@/public/logo.svg"
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import UserTypeSelection from './UserTypeForm'
import CompanyForm from './CompanyForm'
import JobSeekerForm from './JobSeekerForm'

type UserSelectionType = "company" | "jobSeeker" | null;

export default function OnboardingForm() {
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState<UserSelectionType>(null)

    function handleUserTypeSelection(type: UserSelectionType){
        setUserType(type);
        setStep(2);
    }

    function renderStep(){
        switch (step) {
            case 1:
                return <UserTypeSelection onSelect={handleUserTypeSelection} />

            case 2: return userType ==="company" ? (<CompanyForm />) : (<JobSeekerForm />)

            default: return null;
        }
    }
  return (
    <>
        <div className="flex items-center gap-3 mb-10">
            <Image src={Logo} alt="JobBoard Logo" width={50} height={50} />
            <h1 className="text-4xl font-bold">
                Job<span className="text-primary">Board</span>
            </h1>
        </div>

        <Card className=" w-full max-w-lg">
            <CardContent className="p-6">
                {renderStep()}
            </CardContent>
        </Card>
    </>
  )
}
