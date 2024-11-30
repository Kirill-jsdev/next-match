import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button as={Link} href="/members">
        Click me
      </Button>
    </div>
  );
}
