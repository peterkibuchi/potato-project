import { NextResponse, type NextRequest } from "next/server";

import { ratelimit } from "~/server/ratelimit";

export default async function middleware(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";

  try {
    const { success } = await ratelimit.limit(ip);
    if (!success) return new NextResponse("You are writing messages too fast.");

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return new NextResponse(
      "Something went wrong processing your message. Please try again later.",
    );
  }
}

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
