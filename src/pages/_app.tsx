import App, { AppContext } from "next/app";

import { ColorTheme } from "@/layout/ColorTheme";
import { css, Global } from "@emotion/core";

class BaseApp extends App {
    static async getInitialProps(appContext: AppContext) {
        // calls page's `getInitialProps` and fills `appProps.pageProps`
        const appProps = await App.getInitialProps(appContext);

        // Return additional props here

        return appProps;
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Global styles={globalStyle} />
                <ColorTheme>
                    <Component {...pageProps} />
                </ColorTheme>
            </>
        );
    }
}

const globalStyle = css`
    @font-face {
        font-family: "Lato", serif;
    }

    * {
        box-sizing: border-box;
    }

    :focus {
        outline: none;
    }

    html {
        font-family: "Lato", serif;
    }
    body {
        margin: 0;
        font-size: 1.3em;
        line-height: 1.5;
    }

    a,
    a:visited,
    a:active {
        color: inherit;
    }

    button {
        -webkit-appearance: none;
        background-color: transparent;
    }

    button:active {
        border-style: solid;
    }
`;

export default BaseApp;
