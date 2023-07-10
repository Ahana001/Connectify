import "./MenuBar.css";

import {
  AiFillHome,
  AiOutlineHome,
  AiFillCompass,
  AiOutlineCompass,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import {
  BsBookmarksFill,
  BsBookmark,
  // BsPlusSquareFill,
  BsPlusSquare,
} from "react-icons/bs";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { setToggleModel } from "../../../../Store/displaySlice";

export function MenuBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.authentication);

  const menubarList = [
    {
      path: "/",
      label: "home",
      selectedIcon: <AiFillHome />,
      icon: <AiOutlineHome />,
    },
    {
      path: "/explore",
      label: "explore",
      selectedIcon: <AiFillCompass />,
      icon: <AiOutlineCompass />,
    },
    {
      path: "/bookmarks",
      label: "bookmark",
      selectedIcon: <BsBookmarksFill />,
      icon: <BsBookmark />,
    },
    {
      path: "/liked",
      label: "liked Post",
      selectedIcon: <AiFillHeart />,
      icon: <AiOutlineHeart />,
    },
    {
      path: `/profile/${authUser.username}`,
      label: "Profile",
      selectedIcon: <RiUser3Fill />,
      icon: <RiUser3Line />,
    },
    // {
    //   path: "/",
    //   label: "create",
    //   selectedIcon: <BsPlusSquareFill />,
    //   icon: <BsPlusSquare />,
    // },
  ];
  function getActiveStyle({ isActive }) {
    return {
      fontWeight: isActive ? "500" : "",
    };
  }

  return (
    <div className="LeftMenubarWrapper">
      <ul className="MenuBarList">
        {menubarList.map(({ label, selectedIcon, icon, path }) => {
          return (
            <li key={label}>
              <NavLink
                className="MenuBarListItem"
                to={path}
                style={getActiveStyle}
              >
                <span className="MenuBarIcon">
                  {location.pathname === path ? selectedIcon : icon}
                </span>
                <span className="MenuBarText">{label}</span>
              </NavLink>
            </li>
          );
        })}
        <li
          className="MenuBarListItem"
          onClick={() => {
            dispatch(setToggleModel(true));
          }}
        >
          <span className="MenuBarIcon">
            <BsPlusSquare />
          </span>
          <span className="MenuBarText">create</span>
        </li>
      </ul>
      <div className="UserProfileContainer">
        <div className="UserInfo">
          <div>
            <div
              className="UserAvtar"
              style={{ minHeight: "4rem", minWidth: "4rem" }}
            >
              <div className="UserAvtarImageContainer">
                <img
                  src={authUser.image ?? "../asserts/user.png"}
                  alt="avtar"
                  style={{ minHeight: "3.8rem", minWidth: "3.8rem" }}
                />
              </div>
            </div>
            <div className="UserNameStack">
              <span>{authUser.username}</span>
              <span>@{authUser.username}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
