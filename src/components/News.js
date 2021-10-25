import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
    static defaultProps = {
        pageSize: 9,
        country: "in",
        category: "general"
    }
    static propTypes = {
        apiKey: PropTypes.string.isRequired,
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
    }
    articles = {
        "status": "ok",
        "totalResults": 3,
        "articles": [
            {
                "source": {
                    "id": "al-jazeera-english",
                    "name": "Al Jazeera English"
                },
                "author": "Bilal Kuchay",
                "title": "How Umran Malik became an icon for young Kashmiri cricketers",
                "description": "Dedication and luck drafted the 21-year-old into India’s T20 World Cup squad, much to the delight of those back home.",
                "url": "http://www.aljazeera.com/sports/2021/10/23/how-umran-malik-became-an-icon-for-young-kashmiri-cricketers",
                "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2021/10/Abdul-Rashid-Malik-at-his-home-in-Jammu.jpg?resize=1200%2C630",
                "publishedAt": "2021-10-23T06:08:12Z",
                "content": "Jammu, Indian-administered Kashmir A group of youngsters are playing cricket on a small ground along the Tawi River in Gujar Nagar locality of Jammu city early in the morning.\r\nA 12-year-old boy runs… [+6276 chars]"
            },
            {
                "source": {
                    "id": "espn-cric-info",
                    "name": "ESPN Cric Info"
                },
                "author": null,
                "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
                "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
                "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
                "urlToImage": null,
                "publishedAt": "2020-04-27T11:41:47Z",
                "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
            },
            {
                "source": {
                    "id": "espn-cric-info",
                    "name": "ESPN Cric Info"
                },
                "author": null,
                "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
                "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
                "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
                "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
                "publishedAt": "2020-03-30T15:26:05Z",
                "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
                "https": "https://newsapi.org/v2/top-headlines?country=us&apiKey=f84b7211b5124a5297ff63bbea2c64c8"
            }
        ]
    }
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            isLoading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `Daily-Update ${this.capitalizeFirst(this.props.category)}`
    }
    handleNextClick = () => {
        if (navigator.onLine) {
            this.getData(this.state.page + 1)
        } else {
            this.handleOffline()
        }
    }

    handleOffline = () => {
        this.setState({
            totalResults: 0,
            articles: []
        })
    }

    async componentDidMount() {
        if (navigator.onLine) {
            this.getData(this.state.page)
        } else {
            this.handleOffline()
        }
    }

    getData = async (pageCount) => {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageCount}&pageSize=${this.props.pageSize}`
        this.props.setProgress(20)
        let data = await fetch(url)
        this.props.setProgress(60)
        let parseData = await data.json()
        this.props.setProgress(80)
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            // articles: this.articles.articles,
            isLoading: false,
            page: pageCount,
            // totalResults: this.articles.totalResults,
            totalResults: parseData.totalResults
        })
        this.props.setProgress(100)
    }

    capitalizeFirst = (category) => {
        return category === "general" ? "" : ` in ${category.charAt(0).toUpperCase() + category.slice(1)}`
    }

    render() {
        return (
            <>
                <h2 className="text-center my-3">Daily Updates - Top Headlines {this.capitalizeFirst(this.props.category)}</h2>
                {this.state.isLoading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.handleNextClick}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                const { title, description, urlToImage, url, author, publishedAt, source } = element
                                return <div className="col-md-4" key={url}>
                                    <NewsItem title={title} description={description} imageUrl={urlToImage} newsUrl={url} author={author} date={publishedAt} source={source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
