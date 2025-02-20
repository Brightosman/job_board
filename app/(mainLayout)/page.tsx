import JobFilters from "@/components/general/JobFilters";
import JobListings from "@/components/general/JobListings";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <section className="grid grid-cols-3 gap-8">
      
      <Card className="col-span-1">
        <JobFilters />
      </Card>

      <Card className="col-span-2">
        <JobListings />
      </Card>
    </section>
  );
}
