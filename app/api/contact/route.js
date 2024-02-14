import connectMongo from "@/utils/ConnectMongo";
import ContactModel from "@/Models/enquiryModel";
export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    const contact = { name, email, message };
    await connectMongo();
    await ContactModel.create(contact);
    return Response.json({ message: "Contact has been sent" });
  } catch (error) {
    return Response.json({ message: error._message });
  }
}
