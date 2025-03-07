"use server";

import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getRSVPs, RSVPProp } from "./actions";
import AddRSVP from '../../../components/rsvp/add-component';

export default async function Page() {
  const events = await getRSVPs();
  return (
    <>
      {" "}
      <main className="px-4 md:px-64 py-16">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <h1 title="Programfelkérések" className="text-6xl my-16 font-geistmono tracking-wider font-semibold text-red-600">
          RSVP
        </h1>
        <AddRSVP />
        </div>
        <RSVPSection
          title="Aktív"
          events={events.filter((x) => x.attendants.length < x.peopleNeeded)}
        />
        <RSVPSection
          title="Betelt"
          events={events.filter((x) => x.attendants.length >= x.peopleNeeded)}
        />
      </main>
    </>
  );
}

const RSVPSection = ({
  title,
  events,
}: {
  title: string;
  events: RSVPProp[];
}) => {
  return (
    <>
      <h3 className="text-xl font-semibold text-red-500 my-4">{title}</h3>
      <Separator />
      <section className="flex flex-row w-full  items-center px-4 md:px-16 gap-6">
        <article className=" max-w-7xl grid grid-cols-1 grid-flow-dense sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6 p-4">
          {events.map((curr) => {
            return <RSVPButton data={curr} key={curr.id} />;
          })}
        </article>
      </section>
    </>
  );
};

const RSVPButton = ({ data }: { data: RSVPProp }) => {
  const { title, createdBy, description, attendants, peopleNeeded } = data;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col gap-4 cursor-pointer bg-neutral-950 max-w-80 h-56 rounded-xl border-2 border-x-red-700 border-t-red-800 shadow-xl border-b-red-600 ">
          <div className="flex flex-row justify-between p-2 bg-neutral-900 rounded-t-xl border-b border-b-red-900 shadow-xl">
            <h3 className="text-2xl font-semibold font-geistmono m-2">
              {title}
            </h3>
            <Tooltip>
              <TooltipTrigger className="">
                <Avatar className="size-8">
                  <AvatarImage src={createdBy.image || "?"}></AvatarImage>
                  <AvatarFallback>
                    {createdBy.name ? createdBy.name[0] : "?"}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{createdBy.name}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <section className="w-full flex flex-col gap-4 items-start px-4">
            <div className="w-full flex flex-row justify-between items-center gap-2">
              <div className="relative w-full bg-neutral-600 rounded-2xl h-2 overflow-hidden">
                <div
                  className="absolute rounded-2xl bg-gradient-to-r from-rose-600 overflow-y-hidden to-emerald-600 h-full"
                  style={{
                    width: `${(attendants.length / peopleNeeded) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-center items-center h-full text-white font-semibold">
                {attendants.length}/{peopleNeeded}
              </div>
            </div>
            <div className="">
              <AvatarCircles
                numPeople={attendants.length}
                avatarUrls={attendants.map((x) => {
                  return {
                    image: x.image || "?",
                    name: x.name || "?",
                  };
                })}
              />
            </div>
            <div className="p-2">
              <p className="line-clamp-1 text-neutral-400">{description}</p>
            </div>
          </section>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {createdBy.name} <br /> {description}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
