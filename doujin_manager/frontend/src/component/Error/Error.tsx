import { Stack } from "@mui/material";
import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Stack spacing={2}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          {isRouteErrorResponse(error) && (
            <i>
              {error.status} {error.statusText}
            </i>
          )}
        </p>
      </Stack>
  );
};
