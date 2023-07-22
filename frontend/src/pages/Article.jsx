import React, { useEffect, useState } from "react";
import CallApi from "../Services/CallApi";
import Navbar from "../components/Navbar";

function Article() {
  const [article, setArticle] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const articleId = localStorage.getItem("singleProductId");
  const userId = localStorage.getItem("userId");
  const [commentText, setCommentText] = useState("");
  const [addedComment, setAddedComment] = useState(false);

  useEffect(() => {
    CallApi.get(`/api/product/${articleId}`)
      .then((res) => setArticle((res.data)))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    CallApi.get(`/api/comment`)
      .then((res) => setCommentsData(res.data))
      
      .catch((err) => console.error(err));
  }, [addedComment]);

  // Filter the comments before rendering
  const commentsList = commentsData.filter(
    (comment) => comment.product_id === parseInt(articleId, 10)
  );

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = () => {
    if (commentText.length > 2) {
      const newComment = {
        product_id: articleId,
        user_id: userId,
        text: commentText,
      };

      CallApi.post("/api/comment", newComment)
        .then((response) => {
          const newComment = response.data;
          setCommentsData([...commentsData, newComment]);
          setCommentText("");
          setAddedComment(!addedComment);
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    }
  };

  console.log(commentsData);

  return (
    <div className="flex flex-col items-center bg-gray-600 min-h-screen bg-cover">
      <Navbar />
      
      <div className="flex flex-col items-center mt-3 mx-4 sm:flex-row lg:w-2/3 xl:w-1/2 border-4 border-cyan-500 bg-cyan-50 rounded-md shadow-lg shadow-cyan-500/100 hover:shadow-green-500/100 hover:border-green-500">
        <img
          className="h-48 w-48 object-cover rounded-md"
          src={article.photo}
          alt={article.title}
        />
        <div className="flex flex-col justify-center p-4">
          <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
          <p className="mt-2 text-sm text-gray-600">{article.description}</p>
          <p className="mt-4 text-2xl font-semibold text-green-700">{article.price} €</p>
        </div>
      </div>

      <div className="w-full mt-4 p-4 rounded-lg bg-gray-700 neon-border">
        <div className="mb-4">
          <textarea
            rows="1"
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className="w-full p-2 rounded-md border border-gray-500 text-white bg-gray-800 focus:outline-none focus:border-green-500 resize-none"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 ml-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Add Comment
          </button>
        </div>

        <div className="commentList grid gap-2">
          {Array.isArray(commentsList) && commentsList.length > 0 ? (
            ((commentsList.reverse())).map((comment) => (
              <div key={comment.id} className="p-2 rounded-md bg-gray-800 text-white">
                {comment.text}
               <div className="mt-2 text-right"> {comment.name}</div>
                
              </div>
            ))
          ) : (
            <p className="text-white">No comment found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Article;
