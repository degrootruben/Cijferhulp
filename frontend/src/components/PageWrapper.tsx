import React from "react";
import { Card, Elevation } from "@blueprintjs/core";

interface Props {
    className?: string,
    children: React.ReactNode
}

export const PageWrapper: React.FC<Props> = ({ className, children }) => {
    return (
        <Card className={`PageWrapper ${className}`} interactive={false} elevation={Elevation.ZERO}>
            { children }
        </Card>
    )
}
