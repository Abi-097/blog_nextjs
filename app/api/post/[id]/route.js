import connectMongo from "@/utils/ConnectMongo";
import PostModel from "@/Models/postModel";

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const PostData = await PostModel.findOne({ _id: params.id });
    return Response.json(PostData);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
