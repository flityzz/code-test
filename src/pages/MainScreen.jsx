import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAxios } from "src/actions/useAxios";

import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box } from "src/components/Box.jsx";
import { Modal } from "src/components/Modal.jsx";

import logoutIcon from "src/assets/logout.svg";

import "src/css/MainScreen.css";

const MainScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dataList, setDataList] = useState([]);
  const [nextItems, setNextItems] = useState("");
  const [currentId, setCurrentId] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [displayFields, setDisplayFields] = useState(false);

  const createInput = useRef(null);
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const isFieldsEmpty =
    (title.trim().length && content.trim().length) !== 0 ? true : false;

  const handleLogoutClick = () => {
    setDataList([]);
    setNextItems("");
    setCurrentId("");
    setModalIsOpen(false);
    setDisplayFields(false);

    navigate("/signup");
  };

  const patchPost = async (id, title, content) => {
    try {
      const axiosInstance = useAxios();
      await axiosInstance.patch(`${id}/`, {
        title: title,
        content: content,
      });

      setDataList(
        dataList.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              title: title,
              content: content,
            };
          } else {
            return item;
          }
        })
      );

      closeModal();
      toast.success("Post edited successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const axiosInstance = useAxios();

      await axiosInstance.delete(`${id}/`);
      setDataList(dataList.filter((post) => post.id != id));

      closeModal();
      toast.warning("Post deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const axiosInstance = useAxios();
      const loginParam = searchParam.get("login");
      const response = await axiosInstance.post("", {
        username: loginParam,
        title: title,
        content: content,
      });

      if (response) {
        if (response.status == (201 || 200)) {
          setDataList([response.data, ...dataList]);
          setTitle("");
          setContent("");
          toast.success("Post created successfully!");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
      setContent("");
    }
  };

  const fetch = async () => {
    try {
      const axiosInstance = useAxios();
      const response = await axiosInstance.get();

      setDataList(response.data.results);
      setNextItems(response.data.next);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreData = async () => {
    try {
      const axiosInstance = useAxios();

      if (nextItems != null) {
        const response = await axiosInstance.get(nextItems);
        setDataList([...dataList, ...response.data.results]);
        setNextItems(response.data.next);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (displayFields, id) => {
    setCurrentId(id);
    setDisplayFields(displayFields);

    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (createInput.current) {
      if (isFieldsEmpty) {
        createInput.current.classList.add("enabled");
      } else {
        createInput.current.classList.remove("enabled");
      }
    }
  }, [title, content]);

  return (
    <>
      <div className="main-screen-container">
        <header>
          <h1>CodeLeap Network</h1>
          <img src={logoutIcon} onClick={handleLogoutClick} />
        </header>

        <main>
          <ToastContainer position={"bottom-right"} />
          {modalIsOpen == true && (
            <Modal
              displayFields={displayFields}
              onCloseModal={closeModal}
              editPost={patchPost}
              deletePost={deletePost}
              id={currentId}
            ></Modal>
          )}

          <div className="main-screen-post-box">
            <h1>What’s on your mind?</h1>

            <span>Title</span>
            <input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />

            <span>Content</span>
            <textarea
              value={content}
              rows="5"
              cols="33"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <input
              ref={createInput}
              type="submit"
              value="Create"
              className="main-screen-submit-input"
              disabled={!isFieldsEmpty}
              onClick={(e) => createPost(e)}
            />
          </div>
          <InfiniteScroll
            dataLength={dataList.length}
            next={() => getMoreData()}
            hasMore={nextItems != null ? true : false}
            loader={
              <h4 style={{ textAlign: "center", marginTop: "24px" }}>
                Loading...
              </h4>
            }
            endMessage={
              <p style={{ textAlign: "center", marginTop: "24px" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {dataList &&
              dataList.map((item) => {
                return (
                  <Box
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    username={item.username}
                    createdTime={item.created_datetime}
                    content={item.content}
                    onModalClick={openModal}
                  />
                );
              })}
          </InfiniteScroll>
        </main>
      </div>
    </>
  );
};

export { MainScreen };
