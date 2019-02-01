import React, { Component } from "react";
import { Storage } from "aws-amplify";
import "./PhotoPreview.css";

export default class PhotoPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: null
    };
  }

  async componentDidMount() {
    try {
      let imageURL;
      const { image } = this.props.photo;

      if (image) {
        imageURL = await Storage.vault.get(image);
      } else {
        imageURL = "no-image.jpg";
      }

      this.setState({ imageURL });
    } catch (e) {}
  }

  render() {
    return (
      <div>
        <div className="photo-image">
          <img src={this.state.imageURL} width="120px" height="100px" alt="Img" />
        </div>
      </div>
    );
  }
}
