import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.slug, "params.slug is required");

	const post = await getPost(params.slug!);
	invariant(post, `Post not found for slug: ${params.slug}`);

	const title = post.title;
	const html = marked(post.markdown);

	return json({ title, html });
};

export default function PostSlug() {
	const { title, html } = useLoaderData<typeof loader>();
	return (
		<main className="mx-auto max-w-4xl">
			<h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</main>
	);
}
