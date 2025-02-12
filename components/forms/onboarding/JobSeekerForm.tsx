import { createJobSeeker } from '@/app/actions';
import { jobSeekerSchema } from '@/app/utils/zodSchemas';
import { UploadDropzone } from '@/components/general/UploadThingReExport';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function JobSeekerForm() {
    const form = useForm<z.infer<typeof jobSeekerSchema>>({
        resolver: zodResolver(jobSeekerSchema),
        defaultValues: {
          about: "",
          name: "",
          resume: "",
        }
      })

      const [pending, setPending] = useState(false);

      async function onSubmit(data: z.infer<typeof jobSeekerSchema>){
          try{
            setPending(true)
            await createJobSeeker(data);
          } catch (error) {
            if (error instanceof Error && error.message !== "NEXT_REDIRECT"){
              console.log("Something went wrong...check JobSeekerForm.tsx");
            }
          } finally {
            setPending(false)
          }
        }
      
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} 
            name="name"
            render={({field}) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        </div>

        <FormField control={form.control} 
            name="about"
            render={({field}) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself..." className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} 
            name="resume"
            render={({field}) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className='relative w-fit'>
                      <iframe src={field.value} width={200} height={250} className="border rounded-lg" />
                      <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2" onClick={() => field.onChange("")}>
                        <XIcon className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone endpoint="resumeUploader"
                      onClientUploadComplete={(res) => {
                        field.onChange(res[0].url)
                      }}

                      onUploadError={() => {
                        console.log("something went wrong");
                      }}

                      className='ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary'
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Submitting..." : "Continue"}
          </Button>
      </form>
    </Form>
  )
}
