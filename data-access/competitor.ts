import { db } from "@/database";
import { competitors, posts } from "@/database/schema";
import { type Competitor } from "@/database/types";
import { eq } from "drizzle-orm";
import "server-only";
import { ulid } from "ulid";

export async function getCompetitors(userId: string): Promise<Competitor[]> {
  return await db.query.competitors.findMany({
    where: eq(competitors.userId, userId),
  });
}

export async function addCompetitor(
  url: string,
  userId: string,
): Promise<Competitor> {
  const id = ulid();
  const [created] = await db
    .insert(competitors)
    .values({
      id,
      url,
      userId,
      createdAt: new Date(),
    })
    .returning();
  return created;
}

export async function deleteCompetitor(competitorId: string): Promise<void> {
  const relatedPosts = await db.query.posts.findMany({
    where: eq(posts.competitorId, competitorId),
  });
  for (const post of relatedPosts) {
    await db
      .update(posts)
      .set({ competitorId: null })
      .where(eq(posts.id, post.id));
  }
  await db.delete(competitors).where(eq(competitors.id, competitorId));
}

export async function updateCompetitor(
  id: string,
  url: string,
): Promise<Competitor> {
  const [updated] = await db
    .update(competitors)
    .set({
      url,
    })
    .where(eq(competitors.id, id))
    .returning();
  return updated;
}