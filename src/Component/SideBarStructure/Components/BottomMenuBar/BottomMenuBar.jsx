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
import "./BottomMenuBar.css";

export function BottomMenuBar() {
  const { authUser } = useSelector((state) => state.authentication);

  const location = useLocation();
  const dispatch = useDispatch();
  const menubarList1 = [
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
  ];
  const menubarList2 = [
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
    <div className="BottomMenubarWrapper">
      <ul className="BottomMenuBarList">
        {menubarList1.map(({ label, selectedIcon, icon, path }) => {
          return (
            <li key={label}>
              <NavLink
                className="BottomMenuBarListItem"
                to={path}
                style={getActiveStyle}
              >
                <span className="BottomMenuBarIcon">
                  {location.pathname === path ? selectedIcon : icon}
                </span>
              </NavLink>
            </li>
          );
        })}
        <li
          className="BottomMenuBarListItem"
          onClick={() => {
            dispatch(setToggleModel(true));
          }}
        >
          <span className="BottomMenuBarIcon">
            <BsPlusSquare />
          </span>
        </li>
        {menubarList2.map(({ label, selectedIcon, icon, path }) => {
          return (
            <li key={label}>
              <NavLink
                className="BottomMenuBarListItem"
                to={path}
                style={getActiveStyle}
              >
                <span className="BottomMenuBarIcon">
                  {location.pathname === path ? selectedIcon : icon}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
