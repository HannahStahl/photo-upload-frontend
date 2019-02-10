import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import ImageModal from './ImageModal';
import config from '../config';

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: props.photo,
      style: {
        height: 250,
        width: 250,
        objectFit: 'cover',
        margin: '10px',
        cursor: 'pointer'
      },
      imageURL: null,
      showModal: false
    };

    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updatePhotoInGrid = this.updatePhotoInGrid.bind(this);
  }

  handleShowModal() {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    });
  }

  setImageURL() {
    try {
      const { image } = this.state.photo;
      if (image) {
        this.setState({ imageURL: config.cloudFront.URL + image });
      }
    } catch (e) {}
  }

  updatePhotoInGrid(image) {
    this.setState({
      imageURL: config.cloudFront.URL + image
    });
    this.props.getPhoto(this.state.photo.photoId);
  }

  componentDidMount() {
    this.setImageURL();
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.showModal}
          onHide={this.handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Change photo:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ImageModal
              photo={this.state.photo}
              handleCloseModal={this.handleCloseModal}
              updatePhotoInGrid={this.updatePhotoInGrid}
            />
          </Modal.Body>
        </Modal>
        <div onClick={this.handleShowModal}>
          <img
            src={this.state.imageURL}
            style={this.state.style}
            alt="Img"
          />
        </div>
      </div>
    );
  }
}

export default Image;
