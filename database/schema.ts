import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const competitors = pgTable("competitors", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  competitorId: text("competitorId").references(() => competitors.id),
  postText: text("postText").notNull(),
  postLink: text("postLink").notNull(),
  postLikes: integer("postLikes").notNull(),
  postComments: integer("postComments").notNull(),
  postShares: integer("postShares").notNull(),
  postedAt: timestamp("postedAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const competitorAnalytics = pgTable("competitor_analytics", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  analysis: text("analysis").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
