
import { auth } from './auth'
import { redirect } from 'next/navigation';

export default async function requireUser() {
    const session = await auth();
    
    if (!session?.user) {
        return redirect("/login")
    }
  return session.user;
}
