import PropTypes from "prop-types";
import { useState } from "react";

import "src/css/Modal.css";

const Modal = ({ id, displayFields, onCloseModal, editPost, deletePost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <div className="modal-background">
        <div className="modal-container">
          {displayFields == false ? (
            <>
              <h1>Are you sure you want to delete this item?</h1>
              <div className="modal-buttons">
                <button
                  className="modal-cancel-button"
                  onClick={() => onCloseModal()}
                >
                  Cancel
                </button>
                <button
                  onClick={() => deletePost(id)}
                  className="modal-delete-button"
                  type="submit"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="modal-post-box">
                <h1>Edit item</h1>

                <span>Title</span>
                <input type="text" onChange={(e) => setTitle(e.target.value)} />

                <span>Content</span>
                <textarea
                  rows="5"
                  cols="33"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-buttons">
                <button
                  className="modal-cancel-button"
                  onClick={() => onCloseModal()}
                >
                  Cancel
                </button>
                <button
                  className="modal-save-button"
                  type="submit"
                  onClick={() => editPost(id, title, content)}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  displayFields: PropTypes.bool,
  onCloseModal: PropTypes.func,
  editPost: PropTypes.func,
  deletePost: PropTypes.func,
  id: PropTypes.string,
};

export { Modal };
