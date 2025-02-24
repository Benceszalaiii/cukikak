"use client";

//* Just some debugging tool to delete a user from the database


// import { deleteUserByCuid } from "@/app/timeline/actions";
import { Button } from "../ui/button";

export default function DbTester() {
  return (
    <Button
      className="fixed top-32 left-32 z-50"
    //   onClick={() => {
    //     deleteUserByCuid("cm7jke2f70000670vk43xccs3");
    //   }}
      variant={"destructive"}
    >
      Click for cookies
    </Button>
  );
}
