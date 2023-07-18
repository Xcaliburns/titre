import React, { useEffect, useState } from "react";
import CallApi from "../Services/CallApi";
import Navbar from "../components/Navbar";

function Article() {
  const [article, setArticle] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const articleId = localStorage.getItem("singleProductId");

  useEffect(() => {
    CallApi.get(`/api/product/${articleId}`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    CallApi.get(`/api/comment`)
      .then((res) => setCommentsData(res.data))
      .catch((err) => console.error(err));
  }, []);

  console.log(article);
  console.log(articleId)
  console.log(commentsData);

  // Filter the comments before rendering
  const commentsList = commentsData.filter((comment) => 
     (comment.product_id === parseInt(articleId,10)));
  

  console.log(commentsList);
  console.log(articleId);
  console.log(commentsData);
  console.log(typeof(articleId));
  

  return (
    <div className="flex flex-col items-center bg-gray-600 min-h-full bg-cover ">
      <Navbar />
      <div
        className="flex flex-row h-48 w-80 items-center border-4 border-cyan-500 bg-cyan-50 rounded-md shadow-lg shadow-cyan-500/100  mt-3 mx-10 hover:shadow-green-500/100 hover:border-green-500"
      >
        <img
          className="h-24 max-w-48 rounded-md   "
          src={`${article.photo}`}
          alt="title"
        />
        <div className="flex flex-col items-center w-max-150 w-min-150   text-wrap  ">
          <div className="  w-48 h-12 text-center">{article.title}</div>
          <div className="  w-48 h-54 text-center">{article.description}</div>
          <div className=" pb-2  text-2xl">{article.price} €</div>
        </div>
      </div>

      <div className="comments">
        <div className="commentList">
        {Array.isArray(commentsList) && commentsList.length > 0 ? (
          commentsList.map((comment) => (
           <div key={comment.id}>{comment.text}</div>
           
          ))
        ) : (
          <p>No comment found.</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default Article;
