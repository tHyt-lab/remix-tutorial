import { Post } from "@prisma/client";
import { prisma } from "~/db.server";

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export async function getPosts() {
	return prisma.post.findMany();
}

export async function getPost(slug: string): Promise<Post | null> {
	return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(
	post: MakeOptional<Post, "createdAt" | "updatedAt">,
) {
	return prisma.post.create({ data: post });
}
