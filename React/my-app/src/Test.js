import React from "react";
import { useState, useEffect } from "react";

const Test = () => {
 useEffect(() => {
    console.log("Run1")

    return () => {
        console.log("Umnounted")
    };
 }, []);
 
 return <h1>Test</h1>

};

export default Test;