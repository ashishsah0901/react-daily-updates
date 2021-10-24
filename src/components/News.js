import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        pageSize: 9,
        country: "in"
    }
    static propTypes = {
        apiKey: PropTypes.string.isRequired,
        pageSize: PropTypes.number,
        country: PropTypes.string,
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
    constructor() {
        super()
        this.state = {
            articles: [],
            isLoading: false,
            page: 1,
            totalResults: 0
        }
    }
    handleNextClick = () => {
        if (navigator.onLine) {
            this.getData(this.state.page + 1)
        } else {
            this.handleOffline()
        }
    }

    handlePreviousClick = () => {
        if (navigator.onLine) {
            this.getData(this.state.page - 1)
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
            await this.getData(this.state.page)
            this.setState({
                totalResults: this.state.articles.totalResults
            })
        } else {
            this.handleOffline()
        }
    }

    getData = async (pageCount) => {
        this.setState({
            articles: [],
            isLoading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${pageCount}&pageSize=${this.props.pageSize}`
        console.log(url);
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            articles: parseData.articles,
            // articles: this.articles,
            isLoading: false,
            page: pageCount
        })
    }

    render() {
        let image = "https://media.istockphoto.com/photos/online-news-in-mobile-phone-close-up-of-smartphone-screen-man-reading-picture-id1065782416?k=20&m=1065782416&s=612x612&w=0&h=Qpv9LBMJbMpjzXFvXTtQvL9l3wM7gX4oFPhCZkn9x7k="
        return (
            <div className="container my-3">
                <h2 className="text-center">Daily Updates - Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        const { title, description, urlToImage, url } = element
                        return <div className="col-md-4" key={url}>
                            <NewsItem title={title} description={description ? description : "Daily - Updates"} imageUrl={urlToImage ? urlToImage : image} altImage="" newsUrl={url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={!navigator.onLine || this.state.page <= 1 || this.state.isLoading} className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                    {this.state.isLoading && <Spinner />}
                    <button type="button" disabled={!navigator.onLine || this.state.page * this.props.pageSize > this.state.totalResults || this.state.isLoading} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div>
            </div>
        )
    }
}

export default News
