import { NextRequest, NextResponse } from "next/server";

// Middleware ini mungkin bertujuan baik, tapi berbahaya jika tidak spesifik
export function middleware(request: NextRequest) {
  // Logika yang salah bisa mengembalikan response kosong untuk semua request
  if (request.method === "OPTIONS") {
    // Respons 204 ini bisa salah teraplikasikan ke request GET untuk PDF
    return new Response(null, { status: 204 });
  }
  return NextResponse.next();
}

// Config matcher yang terlalu luas adalah penyebab utamanya
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
