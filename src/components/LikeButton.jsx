import { useEffect, useState } from "react";
import { Icon, Label } from "semantic-ui-react";

import toggleLike from "../functions/LikePost";
import getIsLiked from "../functions/GetIsLiked";

const LikeButton = ({ postId, userId, likes }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  /* FIXME: Clicking multiple times on the like button causes error in 
  like count */
  const handleClick = async () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    await toggleLike(postId, userId);
  };

  useEffect(() => {
    getIsLiked(postId, userId).then((isLiked) => {
      console.log("get isliked called");
      setLiked(isLiked);
    });
  }, [postId, userId]);

  return (
    <Label
      onClick={handleClick}
      style={{ backgroundColor: "transparent" }}
      icon={<Icon name="like" size="large" color={liked ? "red" : "grey"} />}
      content={likeCount}
    />
  );
};

export default LikeButton;
