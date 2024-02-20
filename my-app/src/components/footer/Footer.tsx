import React from "react";
import { Typography } from "@mui/material";
import FooterButtons from "./FooterButtons";

export default function Footer( props: { color: string }) {

    var buttonIconStyle = {
        color: props.color === "light" ? "black" : "white",
        height: "40px",
        width: "40px",
        '&:hover': {
            backgroundColor: props.color === "light" ? '#d3dce7' : '#16283a'
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div>
                <Typography
                    color={props.color === 'light' ? 'black' : 'white'}
                    sx={{ fontFamily: "JetBrains Mono, monospace", textTransform: 'none' }}
                >
                    Made With ❤️ By Joshua Dierickse
                </Typography>
                <div style={{display: 'flex', justifyContent: 'center', gap: '5px', margin: '5px'}}>
                    <FooterButtons color={props.color} />
                </div>
            </div>
        </div>
        );
};