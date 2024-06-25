import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { allArticles } from "contentlayer/generated";

import { Mdx } from "~/components/content/mdx-components";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config";
import { absoluteUrl, cn, constructMetadata, formatDate } from "~/lib/utils";

export function generateStaticParams() {
  return allArticles.map((post) => ({
    slug: post.slugAsParams,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allArticles.find((post) => post.slugAsParams === params.slug);
  if (!post) return;

  const { title, description, image } = post;

  return constructMetadata({
    title: `${title} | ${siteConfig.name}`,
    description: description,
    image,
    type: "article",
    url: absoluteUrl(post.slug),
  });
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allArticles.find((post) => post.slugAsParams === params.slug);

  if (!post) notFound();

  // const authors = post.authors.map((author) =>
  //   allAuthors.find(({ slug }) => slug === `/authors/${author}`),
  // );

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/articles"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex",
        )}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
        See all articles
      </Link>

      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.date)}
          </time>
        )}

        <h1 className="font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>

        {/* {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://twitter.com/`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
              ) : null,
            )}
          </div>
        ) : null} */}
      </div>

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}

      <Mdx code={post.body.code} />

      <hr className="mt-12" />

      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/articles"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          See all articles
        </Link>
      </div>
    </article>
  );
}
