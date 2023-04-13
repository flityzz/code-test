import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import "src/css/Box.css";
import { useRef } from "react";

import deleteIcon from "src/assets/delete.svg";
import editIcon from "src/assets/edit.svg";

const Box = ({ id, title, content, username, createdTime, onModalClick }) => {
  const [searchParam] = useSearchParams();
  const containerRef = useRef(null);

  const handleDateTime = (date) => {
    const datetime = new Date(date);

    const elapsed = Date.now() - datetime.getTime();

    const minutes = Math.floor(elapsed / 1000 / 60);

    if (minutes > 1440) {
      const days = Math.floor(minutes / 1440);
      const output = `${days} day${days !== 1 ? "s" : ""} ago`;
      return output;
    } else if (minutes > 60) {
      const hours = Math.floor(minutes / 60);
      const output = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
      return output;
    } else {
      const output = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      return output;
    }
  };

  const handleClick = (displayFields) => {
    if (containerRef.current) {
      const id = containerRef.current.className.substring(18).trim();
      onModalClick(displayFields, id);
    }
  };

  return (
    <>
      <div ref={containerRef} className={`box-container box-${id}`}>
        <div className="box-header">
          <h1>{title}</h1>
          <div
            className={
              username === searchParam.get("login")
                ? "box-header-images active-box-images"
                : "box-header-images"
            }
          >
            <img
              src={deleteIcon}
              alt="click to delete"
              onClick={() => handleClick(false)}
            />
            <img
              src={editIcon}
              alt="click to edit"
              onClick={() => handleClick(true)}
            />
          </div>
        </div>
        <div className="box-content">
          <div className="box-content-info">
            <strong>@{username}</strong>
            <span>{handleDateTime(createdTime)}</span>
          </div>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

Box.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  username: PropTypes.string,
  createdTime: PropTypes.string,
  onModalClick: PropTypes.func,
};

export { Box };
