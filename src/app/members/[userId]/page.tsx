import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  userId: string;
};

const MemberDetailsPage = async ({ params }: { params: { userId: string } }) => {
  const member = await getMemberByUserId(params.userId);

  if (!member) {
    return notFound;
  }

  return <div>{member?.country}</div>;
};

export default MemberDetailsPage;
