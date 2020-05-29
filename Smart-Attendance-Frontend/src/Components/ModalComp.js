/** @format */

import React from "react";
import { Modal } from "react-materialize";

const ModalComp = ({ title, message }) => (
  <Modal header={title} trigger>
    {message}
  </Modal>
);

export default ModalComp;
