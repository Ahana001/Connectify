import "./SideBarStructure.css";

import { MenuBar } from "./Components/MenuBar/MenuBar";
import { SuggestionList } from "../SuggestionList/SuggestionList";
import { CreatePostModal } from "../CreatePostModal/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditBoxVisibility,
  setLogoutToggle,
} from "../../Store/displaySlice";
import { getAllPost, setPostData } from "../../Store/postSlice";
import { TransparentLoader } from "../TransparentLoader/TransparentLoader";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  getAllUsers,
  getSuggestionList,
  logoutHandler,
} from "../../Store/authenticationSlice";
import { AiOutlineLogout } from "react-icons/ai";
export function SideBarStructure({ children }) {
  const dispatch = useDispatch();
  const { authToken, followStatus } = useSelector(
    (state) => state.authentication
  );
  const { logoutToggle } = useSelector((state) => state.display);
  const { postStatus } = useSelector((state) => state.post);
  const location = useLocation();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (authToken) {
      dispatch(getAllUsers());
      dispatch(getAllPost());
      dispatch(getSuggestionList({ token: authToken }));
      dispatch(
        setEditBoxVisibility({
          visibility: false,
          postId: null,
        })
      );
      dispatch(
        setPostData({
          id: null,
          content: "",
          displayPicture: null,
          picture: null,
        })
      );
      dispatch(setLogoutToggle(false));
    }
  }, [authToken, dispatch]);

  return (
    <div
      className="PageStructureContainer"
      onClick={() => {
        dispatch(
          setEditBoxVisibility({
            visibility: false,
            postId: null,
          })
        );
        dispatch(
          setPostData({
            id: null,
            content: "",
            displayPicture: null,
            picture: null,
          })
        );
        dispatch(setLogoutToggle(false));
      }}
    >
      <div className="LeftMenubarContainer">
        <MenuBar />
      </div>
      <div
        className="LogOutContainer"
        style={{ display: logoutToggle ? "flex" : "none" }}
      >
        <ul>
          <li
            onClick={async (e) => {
              e.stopPropagation();
              dispatch(logoutHandler());
            }}
          >
            <AiOutlineLogout className="LogOutIcon" /> <span>Log Out</span>
          </li>
        </ul>
      </div>
      <div
        className="PostListAndSuggetionListContainer"
        style={{
          gridTemplateColumns: location.pathname.includes("/profile")
            ? "1fr"
            : "",
        }}
      >
        {children}
        <SuggestionList></SuggestionList>
      </div>
      <CreatePostModal />
      {postStatus === "pending" || followStatus === "pending" ? (
        <TransparentLoader />
      ) : null}
    </div>
  );
}
