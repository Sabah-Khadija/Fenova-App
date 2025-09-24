import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queries";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation();
const likesList = Array.isArray(post.likes)
  ? post.likes.map((user: Models.Document) => user.$id)
  : [];

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

 const savedPostRecord = currentUser?.save?.find(
  (record: Models.Document) => record?.post?.$id === post.$id
);

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        <Icon
       icon={checkIsLiked(likes, userId) ? "f7:suit-heart-fill" : "f7:suit-heart"}
       width={20}
       height={20}
       onClick={(e) => handleLikePost(e)}
       className={`cursor-pointer ${
      checkIsLiked(likes, userId) ? "text-rose-400" : "text-rose-400"
  }`}
/>
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
         <Icon
          icon={
          isSaved
          ? "streamline-freehand:lock-circle"
          : "streamline-freehand:unlock-circle"
        }
        width={24}
        height={24}
        className={`cursor-pointer ${isSaved ? "text-green-500" : "text-rose-400"}`}
        onClick={(e) => handleSavePost(e)}
       />
      </div>
    </div>
  );
};

export default PostStats;
