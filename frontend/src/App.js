import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import EventDetails from "./pages/EventDetails";
import UserEvents from "./pages/UserEvents";
import RequestSummary from "./pages/RequestSummary";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/auth"
          element={<Authentication />}
        />
        <Route
          path="/events/:event_id"
          element={<EventDetails />}
        />
        <Route
          path="/user/events"
          element={<UserEvents />}
        />
        <Route
          path="/request/summary"
          element={<RequestSummary />}
        />
      </Routes>
    </div>
  );
}

export default App;
