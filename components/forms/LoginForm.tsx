import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

import GitHubLogo from '../logo/GithubLogo'
import GoogleLogo from '../logo/GoogleLogo'
import { auth, signIn } from '@/app/utils/auth'
import GeneralSubmitButtons from '../general/SubmitButtons'
import { redirect } from 'next/navigation'

export default async function LoginForm() {
    const session = await auth()

    if (session?.user){
        return redirect("/");
    }
    
  return (
    <div className="flex flex-col gap-6">
        <Card>
            <CardHeader className='text-center'>
                <CardTitle className='text-xl'>Welcome Back</CardTitle>
                <CardDescription>Login with your Google or GitHub account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <form action={async () => {
                        "use server";

                        await signIn ("google", {
                            redirectTo: "/onboarding",
                        })
                    }}>
                        
                        <GeneralSubmitButtons text="Login with Google" width='w-full' variant="outline" icon={<GoogleLogo/>} />
                    </form>

                    <form action={async () => {
                        "use server";

                        await signIn ("github", {
                            redirectTo: "/onboarding",
                        })
                    }}>
                        
                        {/* <Button className='w-full' variant="outline">
                            <GitHubLogo />
                            Login with GitHub
                        </Button> */}
                        <GeneralSubmitButtons text="Login with GitHub" width='w-full' variant="outline" icon={<GitHubLogo/>} />
                    </form>
                </div>
            </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
            By clicking continue, you  agree to our terms and service and privacy policy.
        </div>
    </div>
  )
}
