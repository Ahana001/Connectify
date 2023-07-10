import "./ProfilePage.css";

import { SideBarStructure } from "../../Component/SideBarStructure/SideBarStructure";
import { Avtar } from "../../Component/Avtar/Avtar";
import { useDispatch, useSelector } from "react-redux";
import { BsGrid3X3, BsBookmark } from "react-icons/bs";
import { useEffect, useState } from "react";
import { PostList } from "../../Component/PostList/PostList";
import { Link, useParams } from "react-router-dom";
import {
  followUser,
  getAllUsers,
  getSuggestionList,
  setProfileData,
  unfollowUser,
} from "../../Store/authenticationSlice";
import { getAllPost, setPostData } from "../../Store/postSlice";
import { setEditBoxVisibility } from "../../Store/displaySlice";
import { setIsEditProfileBoxVisibility } from "../../Store/displaySlice";
import { EditProfileModal } from "../../Component/EditProfileModal/EditProfileModal";
import { logoutHandler } from "../../Store/authenticationSlice";
import { AiOutlineLogout } from "react-icons/ai";

export function ProfilePage() {
  const { profileName } = useParams();
  const dispatch = useDispatch();
  const { getAllUsersData, authUser, authToken } = useSelector(
    (state) => state.authentication
  );
  const { getAllPostData } = useSelector((state) => state.post);

  let findUser = getAllUsersData.find((user) => user.username === profileName);
  if (findUser?.id === authUser?.id) {
    findUser = authUser;
  }
  const isFollowingUser = findUser?.followers.find(
    (followersUser) => followersUser?.id === authUser?.id
  );

  const filterUserPost = getAllPostData.filter(
    (post) => post.author_username === findUser?.username
  );
  const followersCount = findUser?.followers?.length;
  const followingCount = findUser?.following?.length;
  const [userProfileTab, setUserProfileTab] = useState("Posts");
  const filterBookmarkedPosts = getAllPostData.filter((post) =>
    post.bookmark_by.find((user) => user.id === findUser?.id)
  );

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

  if (!findUser) {
    return null;
  }
  return (
    <>
      <SideBarStructure>
        <div className="UserProfilePageContainer">
          <div className="UserInformationContainer">
            <Avtar url={findUser.image} />
            <div className="UserProfileDetails">
              <div className="UserNameAndEditButton">
                <div className="UserNameContainer">
                  <div className="ProfilePageUserName">{findUser.username}</div>
                  <div>
                    {findUser.bio !== "" && <div>{findUser.bio}</div>}
                    {findUser.profile_link !== "" && (
                      <Link className="ProfileLink" to={findUser.profile_link}>
                        {findUser.profile_link}
                      </Link>
                    )}
                  </div>
                  <div className="PostFollowDetails">
                    <div>
                      <span>{filterUserPost.length}</span> Posts
                    </div>
                    <div>
                      <span>{followersCount} </span>Followers
                    </div>
                    <div>
                      <span>{followingCount}</span> Followings
                    </div>
                  </div>
                </div>
                {isFollowingUser ? (
                  <button
                    className="FollowUserButton"
                    onClick={() => {
                      dispatch(
                        unfollowUser({ userId: findUser.id, token: authToken })
                      );
                    }}
                  >
                    Unfollow
                  </button>
                ) : authUser.username !== profileName ? (
                  <button
                    className="FollowUserButton"
                    onClick={() => {
                      dispatch(
                        followUser({ userId: findUser.id, token: authToken })
                      );
                    }}
                  >
                    Follow
                  </button>
                ) : null}
                {authUser.username === profileName && (
                  <div className="LogoutAndEditButtonContainer">
                    <button
                      className="LogOutContainer"
                      onClick={() => dispatch(logoutHandler())}
                    >
                      <AiOutlineLogout className="LogOutIcon" />
                      <span>Log Out</span>
                    </button>
                    <button
                      className="EditUserProfileButton"
                      onClick={() => {
                        dispatch(
                          setProfileData({
                            id: authUser.id,
                            bio: authUser.bio,
                            profile_link: authUser.profile_link,
                            image: authUser.image,
                          })
                        );
                        dispatch(setIsEditProfileBoxVisibility(true));
                      }}
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="HorizontalLine"></div>
          {profileName === authUser.username ? (
            <div className="UserProfilePostContainer">
              <div className="UserProfilePostWrapper">
                <ul className="UserProfilePostHeader">
                  <li
                    onClick={() => {
                      setUserProfileTab(() => "Posts");
                    }}
                    style={{
                      borderTop:
                        userProfileTab === "Posts" ? "0.1rem solid" : "none",
                      color: userProfileTab === "Posts" ? "black" : "grey",
                    }}
                  >
                    <BsGrid3X3
                      className="UserProfilePostHeaderIcon"
                      style={{
                        color: userProfileTab === "Posts" ? "black" : "grey",
                      }}
                    />
                    <span>Posts</span>
                  </li>
                  <li
                    onClick={() => {
                      setUserProfileTab(() => "Bookmarked");
                    }}
                    style={{
                      borderTop:
                        userProfileTab === "Bookmarked"
                          ? "0.1rem solid"
                          : "none",
                      color: userProfileTab === "Bookmarked" ? "black" : "grey",
                    }}
                  >
                    <BsBookmark
                      className="UserProfilePostHeaderIcon"
                      style={{
                        color:
                          userProfileTab === "Bookmarked" ? "black" : "grey",
                      }}
                    />
                    <span>Bookmarked</span>
                  </li>
                </ul>
                <PostList
                  list={
                    userProfileTab === "Posts"
                      ? filterUserPost
                      : filterBookmarkedPosts
                  }
                />
              </div>
            </div>
          ) : (
            <div className="UserProfilePostListContainer">
              <div className="UserProfilePostListWrapper">
                <PostList list={filterUserPost} />
              </div>
            </div>
          )}
        </div>
        {<EditProfileModal />}
      </SideBarStructure>
    </>
  );
}
