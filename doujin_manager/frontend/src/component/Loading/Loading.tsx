import { Skeleton } from "@mui/material"
import React from "react"

export const Loading = () => {
    return (
        <div>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
        </div>
    )
}