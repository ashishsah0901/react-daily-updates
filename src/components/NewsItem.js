import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class NewsItem extends Component {
    static defaultProps = {
        altImage: "https://media.istockphoto.com/photos/online-news-in-mobile-phone-close-up-of-smartphone-screen-man-reading-picture-id1065782416?k=20&m=1065782416&s=612x612&w=0&h=Qpv9LBMJbMpjzXFvXTtQvL9l3wM7gX4oFPhCZkn9x7k=",
        author: "Unknown author",
        describe: "Daily - Updates"
    }
    static propTypes = {
        title: PropTypes.string.isRequired,
        describe: PropTypes.string,
        imageUrl: PropTypes.string,
        altImage: PropTypes.string,
        newsUrl: PropTypes.string.isRequired,
        author: PropTypes.string,
        date: PropTypes.string,
    }
    render() {
        let { title, description, imageUrl, altImage, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <div className="d-flex justify-content-end position-absolute top-0 end-0">
                        <span className="badge rounded-pill bg-danger">
                            {source}
                        </span>
                    </div>
                    <img src={imageUrl ? imageUrl : altImage} className="card-img-top" alt={altImage} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By - {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
