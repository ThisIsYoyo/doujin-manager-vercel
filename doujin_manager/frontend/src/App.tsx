import { Container } from "@mui/material";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Author } from "./component/Author/Author";
import { Circle } from "./component/Circle/Circle";
import { DoujinDetail } from "./component/Doujin/DoujinDetail";
import { DoujinList } from "./component/Doujin/DoujinList";
import { ErrorPage } from "./component/Error/Error";
import { Header } from "./component/Header/Header";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DoujinList />,
      errorElement: <ErrorPage />,
    },
    {
      path: "doujin/:doujinId",
      element: <DoujinDetail />,
    },
    {
      path: "author",
      element: <Author />
    },
    {
      path: "circle",
      element: <Circle />
    },
  ]);

  return (
    <>
      <Header />
      <Container className="py-4" maxWidth="lg">
        <RouterProvider router={router} />
      </Container>
    </>
  );
}

export default App;
