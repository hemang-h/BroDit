import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends React.AllHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    classes?: string;
}

