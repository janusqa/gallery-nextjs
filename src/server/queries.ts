// import "server-only" this import allows this code to run ON SERVER ONLY!!!!
// Do not get confused with "use server" means you wish to expose an endpoint for the client to hit
// conversely "use client" ships JS to client but the code still runs on the server
import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
// import analyticsServerClient from "./analytics";

export async function getUserImages() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getImage(id: number) {
  const user = auth();
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  // analyticsServerClient.capture({
  //   distinctId: user.userId,
  //   event: "delete image",
  //   properties: {
  //     imageId: id,
  //   },
  // });

  redirect("/");
}
