import axios from "axios";

export default {

  saveArticle: function (articleData) {
    return axios.post("/api/saved", articleData)
  },

  getSavedArticles: function () {
    return axios.get("/api/saved");
  },
};


