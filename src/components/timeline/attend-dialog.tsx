import { TimelinePropWithUserData } from "@/app/timeline/page";
import { AvatarCircles, AvatarProps } from "../magicui/avatar-circles";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

export default function AttendanceDialog({
  users,
}: {
  users: TimelinePropWithUserData;
}) {
  const urls: AvatarProps[] = users.attendants.map((user) => {
    return { name: user.name || "No name", image: user.image || null };
  });
  return (
    <Dialog>
      <DialogTrigger>
        <AvatarCircles avatarUrls={urls} numPeople={users.attendants.length} />
      </DialogTrigger>
      <DialogContent><DialogTitle>Esemény résztvevői</DialogTitle>
      <DialogDescription asChild>
        <ScrollArea>
            {users.attendants.map((user) => {
                return (
                <div key={user.name} className="flex items-center gap-4">
                    <AvatarCircles
                    avatarUrls={[
                        {
                        name: user.name || "No name",
                        image: user.image || null,
                        },
                    ]}
                    />
                    <p>{user.name}</p>
                </div>
                );
            })}
        </ScrollArea>
      </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
