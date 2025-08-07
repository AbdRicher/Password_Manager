import connectDB from "@/app/lib/database/connection";
import Password from "@/app/lib/database/models/Password";

// GET: Get all saved passwords for a specific Gmail
export async function GET(req) {
  await connectDB();
   
  try {
    const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ success: false, message: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const passwords = await Password.find({ gmail: email });

    return new Response(JSON.stringify({ success: true, passwords }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
