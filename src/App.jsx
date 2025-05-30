import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Meals from "./components/Meals";
import { lazy, Suspense } from "react";

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

const About = lazy(() => import("./components/About")); //For creating lazy loading

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense> //For using lazy loading
        ),
        errorElement: <Error />,
      },
      {
        path: "/contact",
        element: <Contact />,
        errorElement: <Error />,
      },
      {
        path: "/meals/:mealId",
        element: <Meals />,
        errorElement: <Error />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default appRouter;
