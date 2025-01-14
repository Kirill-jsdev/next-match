"use server";

import { auth } from "@/auth";
import { prisma } from "../lib/prisma";
import { source } from "framer-motion/client";
import { getAuthUserId } from "./authActions";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
  try {
    const userId = await getAuthUserId();

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId: targetUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId: targetUserId,
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchCurrentUserLikedIds(targetUserId: string) {
  try {
    const userId = await getAuthUserId();

    const likedIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });

    return likedIds.map((like) => like.targetUserId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
