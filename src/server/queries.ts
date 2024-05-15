// import "server-only" this import allows this code to run ON SERVER ONLY!!!!
// Do not get confused with "use server" means you wish to expose an endpoint for the client to hit
// conversely "use client" ships JS to client but the code still runs on the server
import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getUserImages() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}
