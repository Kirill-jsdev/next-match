import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h3 className="text-2xl font-semibold">User session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2000)}</pre>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button type="submit" color="primary" variant="bordered">
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        "Not signed in"
      )}
    </div>
  );
}
