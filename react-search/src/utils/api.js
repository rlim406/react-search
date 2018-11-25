import axios from "axios";

export default {

  getArticle: function () {
    return axios.get("/api/saved");
  },

  saveArticle: function (articledata) {
    return axios.post("/api/saved", articledata);
  },
};


