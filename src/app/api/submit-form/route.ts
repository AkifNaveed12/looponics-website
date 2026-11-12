import { NextRequest, NextResponse } from "next/server";

const getBackendUrl = (): string => {
  if (process.env.BOOKING_BACKEND_URL) {
    return process.env.BOOKING_BACKEND_URL.replace(/\/+$/, "");
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8000";
  }
  return "https://loop-btqc.onrender.com";
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const backendUrl = getBackendUrl();

    const response = await fetch(`${backendUrl}/submit-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error proxying submit-form request:", error);
    return NextResponse.json(
      {
        ok: false,
        detail:
          "Could not reach the form backend server. Please ensure the backend is running.",
      },
      { status: 502 }
    );
  }
}
