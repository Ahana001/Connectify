import { useSelector } from "react-redux";
import "./SuggestionList.css";

import { useLocation } from "react-router-dom";
import { SuggestionCard } from "../SuggestionCard/SuggestionCard";
import { SuggestionCardSkeleton } from "../SuggestionCardSkeleton/SuggestionCardSkeleton";

export function SuggestionList() {
  const location = useLocation();
  const { getSuggestionListData, getSuggestionListStatus } = useSelector(
    (state) => state.authentication
  );

  if (location.pathname.includes("/profile")) {
    return null;
  }
  const getOnlyFirstSevenSuggestions = getSuggestionListData.slice(0, 7);
  return (
    <div className="SuggestionListContainer">
      <div className="SuggestionListHeader">Suggested for you</div>
      {getSuggestionListStatus === "pending" ? (
        <SuggestionCardSkeleton />
      ) : (
        <>
          <div className="SuggestionListContainer">
            <ul>
              {getOnlyFirstSevenSuggestions.map((user) => {
                return (
                  <>
                    <li key={user.id}>
                      <SuggestionCard user={user} />
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
