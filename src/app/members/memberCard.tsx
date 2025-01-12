import { Card, CardFooter, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import React from "react";

type Props = { member: Member };

const MemberCard = ({ member }: Props) => {
  return (
    <Card fullWidth>
      <Image isZoomed alt={member.name} width={300} src={member.image || "/images/user.png"} className="aspect-square object-cover" />
      <CardFooter>
        <div className="flex flex-col text-white">
          <span className="font-semibold">{member.name}</span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
