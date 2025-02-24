import { TimelinePropWithUserData } from "@/app/timeline/page";
import { translateRole } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import AttendanceDialog from "./attend-dialog";

export default function Entry({ data }: { data: TimelinePropWithUserData }) {
  const creator = data.createdBy;
  return (
    <article className="xl:grid flex flex-col gap-4 grid-cols-1 place-items-start xl:grid-cols-2 grid-flow-col xl:grid-flow-row">
      {
        //* SECTION FOR TITLE AND CREATOR
      }
      <div className=" text-start flex  font-semibold text-neutral-50 tracking-wider text-5xl">
        <p>{data.title}</p>
      </div>
      <div className=" pl-4 text-neutral-300 w-full justify-end items-center gap-2 flex">
        <h3 className="text-right truncate xl:text-lg font-semibold">
          {creator.name}
        </h3>
        <Avatar className="size-4 xl:size-8">
          <AvatarImage src={creator.image || ""}></AvatarImage>
          <AvatarFallback>{creator.name && creator.name[0]}</AvatarFallback>
        </Avatar>
        <p className="text-neutral-400 xl:text-base text-sm">
          {translateRole(data.access)}
        </p>
      </div>
      {
        //* SECTION FOR  METADATA ETC
      }
      <div className="col-span-1">
        {data.tags.map((item) => {
          return (
            <Badge variant={"outline"} key={item}>
              {item}
            </Badge>
          );
        })}
      </div>
      <div className="col-span-1 w-full justify-end flex">
        <AttendanceDialog users={data} />
      </div>
      <div className="col-span-2 tracking-wider text-neutral-400">{data.description.toUpperCase()}</div>
    </article>
  );
}
