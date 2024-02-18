import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
	{
		slug: "my-first-post",
		title: "My First Post",
		markdown: `
# This is my first post

Isn't it great?
    `.trim(),
	},
	{
		slug: "90s-mixtape",
		title: "A Mixtape I Made Just For You",
		markdown: `
# 90s Mixtape

- I wish (Skee-Lo)
- This Is How We Do It (Montell Jordan)
- Everlong (Foo Fighters)
- Ms. Jackson (Outkast)
- Interstate Love Song (Stone Temple Pilots)
- Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
- Just a Friend (Biz Markie)
- The Man Who Sold The World (Nirvana)
- Semi-Charmed Life (Third Eye Blind)
- ...Baby One More Time (Britney Spears)
- Better Man (Pearl Jam)
- It's All Coming Back to Me Now (Céline Dion)
- This Kiss (Faith Hill)
- Fly Away (Lenny Kravits)
- Scar Tissue (Red Hot Chili Peppers)
- Santa Monica (Everclear)
- C'mon N' Ride it (Quad City DJ's)
    `.trim(),
	},
];

async function main() {
	for (const post of posts) {
		await prisma.post.upsert({
			where: { slug: post.slug },
			update: post,
			create: post,
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
