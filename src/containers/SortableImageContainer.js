import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import Image from './Image';

const SortableImageContainer = SortableElement((props) => {
  return (
    <Image photo={props.photo} getPhoto={props.getPhoto} />
  );
});

export default SortableImageContainer;
