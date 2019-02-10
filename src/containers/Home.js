import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { PageHeader } from "react-bootstrap";
import Photos from "./Photos";
import "./Home.css";
import LoaderButton from "../components/LoaderButton";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isPublishing: false,
      buttonEnabled: false,
      saved: false,
      photos: []
    };

    this.handleSave = this.handleSave.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.updatePhotos = this.updatePhotos.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  async getPhoto(photoId) {
    try {
      const photo = await this.photo(photoId);
      this.setState({
        photos: this.state.photos.map(function(photoInList) {
          if (photoInList.photoId === photoId) {
            return photo;
          }
          return photoInList;
        })
      });
    } catch (e) {
      alert(e);
    }
  }

  async getPhotos() {
    try {
      const photos = await this.photos();
      this.setState({ photos });
    } catch (e) {
      alert(e);
    }
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    await this.getPhotos();
    this.setState({ isLoading: false });
  }

  photo(photoId) {
    return API.get("photos", `/photos/${photoId}`);
  }

  photos() {
    return API.get("photos", "/photos");
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
      <div>
        <div className="photos" id="photos">
          <PageHeader>
            Your Photos
            <p
              className="logout-link"
              onClick={this.props.handleLogout}
            >
              Logout
            </p>
          </PageHeader>
          {!this.state.isLoading &&
            <Photos
              photos={this.state.photos}
              getPhoto={this.getPhoto}
              updatePhotos={this.updatePhotos}
              enableButton={this.enableButton}
          />}
        </div>
        <LoaderButton
          block
          bsStyle="primary"
          bsSize="large"
          disabled={!this.state.buttonEnabled}
          type="submit"
          isLoading={this.state.isPublishing}
          text={this.state.saved ? "Saved!" : "Save"}
          loadingText="Saving..."
          onClick={this.handleSave}
        />
      </div>
    );
  }

  enableButton() {
    this.setState({ buttonEnabled: true, saved: false });
  }

  updateImageRank(photo, newRank) {
    return API.put("photos", `/photos/${photo.photoId}`, {
      body: {
        image: photo.image,
        imageRank: newRank
      }
    });
  }

  updatePhotos(photos) {
    this.setState({ photos });
  }

  handleSave() {
    this.setState({ isPublishing: true });
    for (var i = 0; i < 12; i++) {
      this.updateImageRank(this.state.photos[i], i);
    }
    this.setState({
      isPublishing: false,
      buttonEnabled: false,
      saved: true
    });
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderPhotos() : this.renderLander()}
      </div>
    );
  }
}
