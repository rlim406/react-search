import React, { Component } from "react";
import Results from "./Results";
import API from "../utils/api";

class Main extends Component {

  componentDidMount() {
    this.getSavedArticles()
  }

  getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }

  renderArticles = () => {

    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        title={article.headline.main}
        url={article.link}
      />
    ));

  }
}

export default Main;