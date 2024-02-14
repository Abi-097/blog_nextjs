import connectMongo from "@/utils/ConnectMongo";

import PostModel from "@/Models/postModel";

export async function GET(req) {
  const query = req.nextUrl.searchParams.get("q");

  try {
    await connectMongo();
    let PostData;
    if (query) {
      PostData = await PostModel.find({
        $or: [
          {
            title: new RegExp(query, "i"),
          },
          {
            description: new RegExp(query, "i"),
          },
        ],
      });
    } else {
      PostData = await PostModel.find({});
    }

    return Response.json(PostData);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}

//before the search option code:
// export async function GET() {
//   try {
//     await connectMongo();

//     const PostData = await PostModel.find({});
//     return Response.json(PostData);
//   } catch (error) {
//     return Response.json({ message: error.message });
//   }
// }
