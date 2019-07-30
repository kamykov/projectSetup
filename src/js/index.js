/* eslint-env browser */
import React from "react";
import Reactdom from "react-dom";
import App from "./App";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import pl from "react-intl/locale-data/pl";

addLocaleData([...en, ...pl]);

Reactdom.render(<App />, document.getElementById("app"));
