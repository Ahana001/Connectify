import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { SignupPage } from "./Pages/SignupPage/SignupPage";
import { PostFeedPage } from "./Pages/PostFeedPage/PostFeedPage";
import { ExplorePage } from "./Pages/ExplorePage/ExplorePage";
import { BookMarkPage } from "./Pages/BookMarkPage/BookMarkPage";
import { LikedPostPage } from "./Pages/LikedPostPage/LikedPostPage";
import { PrivateRoute } from "./Component/PrivateRoute/PrivateRoute";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import { ScrollToTop } from "./Component/ScrollToTop/ScrollToTop";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PostFeedPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <ExplorePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <PrivateRoute>
              <BookMarkPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <LikedPostPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:profileName"
          element={
            <PrivateRoute>
              <ScrollToTop>
                <ProfilePage />
              </ScrollToTop>
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ScrollToTop>
              <LoginPage />
            </ScrollToTop>
          }
        />
        <Route
          path="/signup"
          element={
            <ScrollToTop>
              <SignupPage />
            </ScrollToTop>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
