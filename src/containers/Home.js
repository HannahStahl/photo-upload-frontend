import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import PhotoPreview from "./PhotoPreview";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      photos: []
    };
  }

  async componentDidMount() {
    this.props.reenterHomePage();

    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const photos = await this.photos();
      this.setState({ photos });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  photos() {
    return API.get("photos", "/photos");
  }

  renderPhotosList(photos) {
    return photos.map(
      (photo, i) => (
        <LinkContainer
          key={photo.photoId}
          to={`/photos/${photo.photoId}`}
        >
          <ListGroupItem>
            <PhotoPreview photo={photo} />
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Photo Admin</h1>
        <p>A simple photo admin tool</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }

  renderPhotos() {
    return (
      <div className="photos">
        <PageHeader>Your Photos</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderPhotosList(this.state.photos)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderPhotos() : this.renderLander()}
      </div>
    );
  }
}
