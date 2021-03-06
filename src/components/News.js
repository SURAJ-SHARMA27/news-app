import React, { Component } from 'react';
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

import Spinner from './Spinner';
//de04e5f3d6fd4d45ba0d1f1a651c3dbb
export class News extends Component {
    static defaulProps = {
        country: 'in',
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            totalResults: 0

        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} QUICK-XPLORE`;
    }
    async update() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de04e5f3d6fd4d45ba0d1f1a651c3dbb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        let data = await fetch(url);
        this.props.setProgress(30);

        let parsedData = await data.json()
        console.log(parsedData);
        this.props.setProgress(70);

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);

    }
    async componentDidMount() {
        this.update();

    }
    handlePrevClick = async () => {

        this.setState({ page: this.state.page - 1 });
        this.update();
        //})
    }
    handleNextClick = async () => {

        this.setState({ page: this.state.page + 1 });
        this.update();


    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=de04e5f3d6fd4d45ba0d1f1a651c3dbb&page=${this.state.page}&pageSize=${this.props.pageSize}`;


        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };
    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center " style={{ margin: '100px' }}>Today's Headlines On {this.capitalizeFirstLetter(this.props.category)}</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className=" my-3 col-12 col-md-4 " key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 90) : ""} ImgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />


                                </div>

                            })}
                        </div>
                    </div>

                </InfiniteScroll>

            </div>
        )
    }
}

export default News
