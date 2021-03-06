import React from "react";
import News from "./News";
import newsApi from "../apis/newsApi";

export default class Category extends React.PureComponent {
  state = {
    news: [],
  };

  componentDidMount = () => {
    let categoryName = this.props.match.params.CategoryName;
    newsApi
      .get(
        `latest-news?country=${this.props.selectedRegion}&category=${categoryName}&apiKey=${process.env.REACT_APP_CURRENTS_API_KEY}`
      )
      .then((response) => {
        if (response.status === 200) {
          this.props.history.replace({
            state: { fromNav: false },
          });
          this.setState({ news: response.data.news });
        }
      })
      .catch((error) => console.log(error));
  };

  componentDidUpdate = (prevProps, prevState) => {
    let currCategory = this.props.match.params.CategoryName;
    if (this.props.location.state.fromNav === true) {
      newsApi
        .get(
          `latest-news?country=${this.props.selectedRegion}&category=${currCategory}&apiKey=${process.env.REACT_APP_CURRENTS_API_KEY}`
        ) 

        .then((response) => {
          if (response.status === 200) {
            this.props.history.replace({
              state: { fromNav: false },
            });
            this.setState({ news: response.data.news });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  on

  render() {
    return (
      <div>
        <News news={this.state.news} />
      </div>
    );
  }
}
