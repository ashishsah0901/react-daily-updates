import React, { Component } from 'react'
import loading from "./loader.gif"

export default class Spinner extends Component {
    render() {
        return (
            <div className="container d-flex justify-content-center my-3">
                <img src={loading} alt="loading" />
            </div>
        )
    }
}
