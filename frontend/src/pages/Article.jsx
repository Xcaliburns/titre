import { useEffect, useState } from "react";
import CallApi from "../Services/CallApi";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../context/UserContext";

function Article() {
  const [article, setArticle] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const articleId = localStorage.getItem("singleProductId");
  const [commentText, setCommentText] = useState("");
  const [addedComment, setAddedComment] = useState(false);

  const { user } = useUserContext();

  useEffect(() => {
    CallApi.get(`/api/product/${articleId}`)
      .then((res) => setArticle(res.data))
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

  const handleCommentChange = (err) => {
    setCommentText(err.target.value);
  };

  const handleAddComment = () => {
    if (commentText.length > 2) {
      const newComment = {
        product_id: articleId,
        user_id: user.userId,
        text: commentText,
      };

      CallApi.post("/api/comment", newComment)
        .then((res) => {
          const newComment = res.data;
          setCommentsData([...commentsData, newComment]);
          setCommentText("");
          setAddedComment(!addedComment);
          toast.success("🦄 merci pour votre commentaire!");
        })
        .catch((err) => {
          console.err("Error adding comment:", err);
          toast.error("❌ Échec lors de l'ajout du commentaire.");
        });
    } else {
      toast.error("❌ le commentaire est vide");
    }
  };

  
  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen bg-cover">
      <Navbar />

      <div className="flex flex-col items-center mt-3 mx-4 sm:flex-row lg:w-2/3 xl:w-1/2 border-4 border-cyan-500 bg-gray-800 text-gray-100 rounded-md shadow-lg shadow-cyan-500/100 hover:shadow-green-500/100 hover:border-green-500">
        <img
          className="h-48 w-48 object-cover rounded-md"
          src={article.photo}
          alt={article.title}
        />
        <div className="flex flex-col justify-center p-4">
          <h2 className="text-xl font-semibold ">{article.title}</h2>
          <p className="mt-2 text-sm whitespace-pre-wrap ">{article.description}</p>
          <p className="mt-2 text-sm ">{`genre: ${article.genre}`}</p>
          <p className="mt-2 text-sm ">{`studio: ${article.studio}`}</p>
          <p className="mt-2 text-sm ">{`sortie:${article.release}`}</p>
          <p className="mt-4 text-2xl font-semibold ">{`Prix: ${article.price} €`}</p>
        </div>
      </div>

      <div className="w-full mt-4 p-4 rounded-lg bg-gray-300 text-gray-100 neon-border">
        {user && (
          <div className="mb-4">
            <textarea
              rows="1"
              value={commentText}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="w-full p-2 rounded-md border border-gray-500  bg-gray-800  focus:outline-none focus:border-green-500 resize-none"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 ml-2 text-sm font-medium  bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Add Comment
            </button>
            <ToastContainer />
          </div>
        )}

        <div className="commentList grid gap-2">
          {Array.isArray(commentsList) && commentsList.length > 0 ? (
            commentsList.reverse().map((comment) => (
              <div
                key={comment.id}
                className="p-2 rounded-md bg-gray-800 text-gray-100"
              >
                {comment.text}
                <div className="mt-2 text-right"> {comment.name}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              Pas encore de commentaire , ajoutez en un 😉{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Article;
