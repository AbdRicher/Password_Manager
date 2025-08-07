import { addPassword } from "@/app/lib/services/passService";
import connectDB from "@/app/lib/database/connection";
import Password from "@/app/lib/database/models/Password";
import { TrySharp } from "@mui/icons-material";

export async function POST(request) {
  await connectDB();

  try {
    const { url, username, password: userpassword, email: gmail } = await request.json();
    console.log(url, username, userpassword, gmail);

    if (!url || !username || !userpassword || !gmail) {
      return new Response(JSON.stringify({
        success: false,
        message: "All fields are required",
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await addPassword(url, username, userpassword, gmail);

    if(!result){
       return new Response(JSON.stringify({
        success: false,
        message: "result not found",
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, message: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({
      success: false,
      message: e.message,
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


export async function PUT(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { email, oldUsername, newUsername, newPassword } = body;

    if (!email || !oldUsername || !newUsername || !newPassword) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updated = await Password.findOneAndUpdate(
      { gmail: email, username: oldUsername },
      { username: newUsername, password: newPassword },
      { new: true }
    );

    if (!updated) {
      return new Response(JSON.stringify({ message: "No matching entry found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Updated successfully", updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "Internal Server Error in PUT" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


export async function DELETE(req) {
  await connectDB();
try{
  const body = await req.json();
  const { email, oldUsername } = body;
  console.log(email,oldUsername);

  if (!email || !oldUsername){
     return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
  }

  const deleted = await Password.findOneAndDelete({ gmail: email, username: oldUsername });

  if (!deleted) {
     return new Response(JSON.stringify({ message: "No matching entry found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
  }

    
     return new Response(JSON.stringify({ message: "Deleted successfully", deleted }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

}
catch(e){
    return new Response(JSON.stringify({ message: "Internal Server Error in DELETE" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
}

}
