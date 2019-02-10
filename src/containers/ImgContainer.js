import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableImageContainer from './SortableImageContainer';

const ImgContainer = SortableContainer((props) => {
  return (
    <div>
      {props.photos.map((photo, index) => (
        <SortableImageContainer
          key={photo.photoId}
          index={index}
          photo={photo}
          getPhoto={props.getPhoto}
        />
      ))}
    </div>
  );
});

export default ImgContainer;
