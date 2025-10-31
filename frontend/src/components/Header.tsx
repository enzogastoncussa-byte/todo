import React from "react";

export const Header: React.FC = () => {
    return (
        <div className="space-y-2 text-center">

            <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">TodoX</h1>
            <p className="text-muted-foreground">Your personal task manager</p>
        </div>
    )
}