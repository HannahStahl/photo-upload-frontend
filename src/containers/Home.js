import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { PageHeader } from "react-bootstrap";
import Photos from "./Photos";
import "./Home.css";
import LoaderButton from "../components/LoaderButton";
import config from "../config";

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
    this.deletePhoto = this.deletePhoto.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  async componentDidMount() {
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
          {!this.state.isLoading && <Photos photos={this.state.photos} enableButton={this.enableButton} />}
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

  deletePhoto(photo) {
    console.log("in deletePhoto");
    console.log("photo.photoId: ", photo.photoId);
    return API.del("photos", `/photos/${photo.photoId}`);
  }

  addPhoto(photo, newRank) {
    console.log("in addPhoto");
    var imageURL = photo.firstChild.firstChild.getAttribute("src");
    var image = imageURL.split(config.cloudFront.URL)[1];
    return API.post("photos", "/photos", {
      body: {
        image,
        imageRank: newRank.toString()
      }
    });
  }

  handleSave() {
    this.setState({ isPublishing: true });
    var photos = document.getElementById("photos").lastChild.firstChild.childNodes;
    for (var i = 0; i < photos.length; i++) {
      console.log("about to enter deletePhoto");
      this.deletePhoto(this.state.photos[i]);
      console.log("about to enter addPhoto");
      this.addPhoto(photos[i], i);
    }
    this.setState({ isPublishing: false, buttonEnabled: false, saved: true });
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderPhotos() : this.renderLander()}
      </div>
    );
  }
}
