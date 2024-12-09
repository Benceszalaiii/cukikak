import { auth, signIn } from "@/lib/auth";
import { Button } from "./ui/button";

export default async function SignInButton() {
  const session = await auth();
  if (session) {
    return null;
  }
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
}
