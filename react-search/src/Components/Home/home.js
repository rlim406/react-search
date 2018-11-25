import React from "react";

const HomePage = props =>

  <div className="row">
    <div className="col-lg-12">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h2 className="panel-title">
            Home Page
            </h2>
        </div>

        <div className="panel-body">
          {props.renderArticles()}
        </div>
      </div>
    </div>
  </div>


export default HomePage;