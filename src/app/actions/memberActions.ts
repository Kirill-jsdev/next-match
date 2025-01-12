"use server";

import { auth } from "@/auth";
import { prisma } from "../lib/prisma";
import { Photo } from "@prisma/client";

export async function getMembers() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  try {
    return await prisma.member.findMany({
      where: { NOT: { userId: session.user.id } },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    return await prisma.member.findUnique({ where: { userId } });
  } catch (error) {
    console.error(error);
  }
}

export async function getMemberPhotosByUserId(userId: string) {
  try {
    const member = await prisma.member.findUnique({
      where: { userId },
      select: { photos: true }, //this will only return the photos
    });

    if (!member) {
      return null;
    }

    return member.photos.map((p) => p) as Photo[];
  } catch (error) {
    console.error(error);
  }
}
