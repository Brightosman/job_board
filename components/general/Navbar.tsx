import Image from 'next/image'
import Logo from "@/public/logo.svg"
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import { ThemeToggle } from './ThemeToggle'
import { auth, signOut } from '@/app/utils/auth'
import { redirect } from 'next/navigation'
import { LogInIcon, LogOut, User2 } from 'lucide-react'

export default async function Navbar() {
    const session = await auth()
    // if (session?.user) {
    //     return redirect("/")
    // }
  return (
    <nav className="flex items-center justify-between py-5">
        <Link href="/">
        <Image src={Logo} alt="Logo Job Board" width={40} height={40} />
            <h1 className="text-2xl font-bold">
                Job<span className="text-primary">Board</span>
            </h1>
        </Link>

        <div className=" flex items-center gap-4">
            <ThemeToggle />

            {session?.user ? (
                <form action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/"});
                }}>
                    
                    <Button variant="destructive"> <LogOut /> Logout</Button>
                </form> 
            ) : ( 
                <Link href="/login" className={buttonVariants({variant:'outline', size:"lg"})}>
                    <User2 />
                    Login
                </Link>
            )}
            
        </div>
    </nav>
  )
}
