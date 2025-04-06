// drizzle/schema.ts
import {
  pgTable,
  varchar,
  timestamp,
  integer,
  text,
  unique,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// User Table
export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().default("cuid()"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),

  imageUrl: text("image_url"),
  firstName: text("first_name"),
  lastName: text("last_name"),

  emailAddress: varchar("email_address", { length: 255 }).unique().notNull(),

  credits: integer("credits").default(150),
});

// Project Table
export const projects = pgTable("projects", {
  id: varchar("id", { length: 255 }).primaryKey().default("cuid()"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),

  name: text("name").notNull(),
  githubUrl: text("github_url").notNull(),

  deletedAt: timestamp("deleted_at"),
});

// UserToProject Table
export const userToProjects = pgTable(
  "user_to_projects",
  {
    id: varchar("id", { length: 255 }).primaryKey().default("cuid()"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),

    userId: varchar("user_id", { length: 255 }).notNull(),
    projectId: varchar("project_id", { length: 255 }).notNull(),
  },
  (table) => ({
    userProjectUnique: unique().on(table.userId, table.projectId),
  }),
);

// Commit Table
export const commits = pgTable("commits", {
  id: varchar("id", { length: 255 }).primaryKey().default("cuid()"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),

  projectId: varchar("project_id", { length: 255 }).notNull(),

  commitMessage: text("commit_message").notNull(),
  commitHash: varchar("commit_hash", { length: 255 }).notNull(),
  commitAuthorName: text("commit_author_name").notNull(),
  commitAuthorAvatar: text("commit_author_avatar").notNull(),
  commitDate: timestamp("commit_date").notNull(),

  summary: text("summary").notNull(),
});

// Optional: Define relations (if you're using drizzle ORM's relations helper)
export const userRelations = relations(users, ({ many }) => ({
  userToProjects: many(userToProjects),
}));

export const projectRelations = relations(projects, ({ many }) => ({
  userToProjects: many(userToProjects),
  commits: many(commits),
}));

export const userToProjectRelations = relations(userToProjects, ({ one }) => ({
  user: one(users, {
    fields: [userToProjects.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [userToProjects.projectId],
    references: [projects.id],
  }),
}));

export const commitRelations = relations(commits, ({ one }) => ({
  project: one(projects, {
    fields: [commits.projectId],
    references: [projects.id],
  }),
}));
