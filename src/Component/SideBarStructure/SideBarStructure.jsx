import "./SideBarStructure.css";

import { MenuBar } from "./Components/MenuBar/MenuBar";
import { SuggestionList } from "../SuggestionList/SuggestionList";
import { CreatePostModal } from "../CreatePostModal/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { setEditBoxVisibility } from "../../Store/displaySlice";
import { getAllPost, setPostData } from "../../Store/postSlice";
import { TransparentLoader } from "../TransparentLoader/TransparentLoader";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getAllUsers,
  getSuggestionList,
} from "../../Store/authenticationSlice";
import { BottomMenuBar } from "./Components/BottomMenuBar/BottomMenuBar";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";

export function SideBarStructure({ children }) {
  const dispatch = useDispatch();
  const { authToken, followStatus } = useSelector(
    (state) => state.authentication
  );
  const { postStatus } = useSelector((state) => state.post);
  const location = useLocation();

  useEffect(() => {
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
      }}
    >
      <div className="LeftMenubarContainer">
        <MenuBar />
      </div>
      <ScrollToTop>
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
      </ScrollToTop>
      <BottomMenuBar />
      <CreatePostModal />
      {postStatus === "pending" || followStatus === "pending" ? (
        <TransparentLoader />
      ) : null}
    </div>
  );
}
