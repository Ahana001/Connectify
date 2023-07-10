import "./EditProfileModal.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { setIsEditProfileBoxVisibility } from "../../Store/displaySlice";
import { Avtar } from "../Avtar/Avtar";
import { avtarOptions } from "./constants";
import { BsFillCameraFill } from "react-icons/bs";
import { editUser, setProfileData } from "../../Store/authenticationSlice";

export function EditProfileModal() {
  const { profileData, authToken } = useSelector(
    (state) => state.authentication
  );
  const { isEditProfileBoxVisible } = useSelector((state) => state.display);
  const [profileInputForm, setProfileInputForm] = useState({
    id: profileData.id,
    image: profileData.image,
    bio: profileData.bio,
    profile_link: profileData.profile_link,
  });
  useEffect(() => {
    setProfileInputForm(profileData);
  }, [profileData]);

  const dispatch = useDispatch();
  return (
    <div
      className="ModalPortal"
      style={{ display: isEditProfileBoxVisible ? "flex" : "none" }}
      onClick={() => {
        dispatch(setIsEditProfileBoxVisibility(false));
      }}
    >
      <div
        className="ModalPortalCloseButton"
        onClick={() => {
          dispatch(setIsEditProfileBoxVisibility(false));
        }}
      >
        <RxCross1 />
      </div>
      <div className="ModalOverlay">
        <div
          className="ModalPortalContent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="EditProfileAvtarContainer">
            <div className="EditProfileImageContainer">
              <span>Profile Image: </span>
              <div className="EditImage">
                <BsFillCameraFill className="EditImageIcon" />
                <Avtar url={profileInputForm.image} alt={profileInputForm.id} />
              </div>
            </div>
            <div className="EditProfileAvtarOptions">
              {avtarOptions.map((avtarOption) => {
                return (
                  <div
                    className="AvtarContainer"
                    style={{ height: 6 + "rem", width: 6 + "rem" }}
                    key={avtarOption}
                  >
                    <img
                      src={avtarOption ?? "../asserts/user.png"}
                      alt="avtar"
                      onClick={(e) => {
                        setProfileInputForm(() => ({
                          ...profileInputForm,
                          image: e.target.src,
                        }));
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="BioContainer">
              <span>Bio:</span>
              <input
                type="text"
                value={profileInputForm.bio}
                onChange={(e) => {
                  setProfileInputForm(() => ({
                    ...profileInputForm,
                    bio: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="ProfileLinkContainer">
              <span>Profile Link:</span>
              <input
                type="text"
                value={profileInputForm.profile_link}
                onChange={(e) => {
                  setProfileInputForm(() => ({
                    ...profileInputForm,
                    profile_link: e.target.value,
                  }));
                }}
              />
            </div>
            <button
              className="EditProfileButton"
              onClick={() => {
                dispatch(
                  editUser({ data: profileInputForm, token: authToken })
                );
                dispatch(setIsEditProfileBoxVisibility(false));
                setProfileInputForm({
                  id: profileData.id,
                  image: null,
                  bio: "",
                  profile_link: "",
                });
                dispatch(
                  setProfileData({
                    id: profileData.id,
                    image: null,
                    bio: "",
                    profile_link: "",
                  })
                );
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
