import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { Image, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import "./Photo.css";

export default class Photo extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isPublishing: null,
      photo: null,
      imageRank: "",
      imageURL: null
    };
  }

  async componentDidMount() {
    this.props.leaveHomePage();

    try {
      let imageURL;
      const photo = await this.getPhoto();
      const { image, imageRank } = photo;

      if (image) {
        imageURL = await Storage.vault.get(image);
      }

      this.setState({
        photo,
        imageRank,
        imageURL
      });
    } catch (e) {
      alert(e);
    }
  }

  getPhoto() {
    return API.get("photos", `/photos/${this.props.match.params.id}`);
  }

  updatePhoto(photo) {
    return API.put("photos", `/photos/${this.props.match.params.id}`, {
      body: photo
    });
  }

  validateForm() {
    return true;
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
    this.setState({ imageURL: URL.createObjectURL(this.file) });
  }

  handlePublish = async event => {
    let image;

    event.preventDefault();

    if (this.file) {
      var fileExtension = this.file.name.toLowerCase().split('.')[1];
      if (!["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
        alert(`Please pick an image file.`);
        return;
      }
    } else if (!this.state.imageURL) {
      alert(`Please upload an image.`);
      return;
    }

    this.setState({ isPublishing: true });

    try {
      if (this.file) {
        image = await s3Upload(this.file);
      }

      await this.updatePhoto({
        image: image || this.state.photo.image,
        imageRank: "0",
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isPublishing: false });
    }
  }

  render() {
    return (
      <div className="Photo">
        {this.state.photo &&
          <form onSubmit={this.handlePublish}>
            {this.state.imageURL &&
              <FormGroup className="image-form-group">
                <ControlLabel>Image</ControlLabel>
                <FormControl.Static>
                  <Image src={this.state.imageURL} responsive />
                </FormControl.Static>
              </FormGroup>}
            <FormGroup controlId="file">
              {!this.state.photo.image &&
                <ControlLabel>Image</ControlLabel>}
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isPublishing}
              text="Save"
              loadingText="Saving..."
            />
          </form>}
      </div>
    );
  }
}
