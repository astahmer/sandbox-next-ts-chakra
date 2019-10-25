import { ColorModeProvider, CSSReset, theme, ThemeProvider, useColorMode } from "@chakra-ui/core";
import { ReactNode } from "react";

export function ColorTheme({ children }: { children: ReactNode }) {
    const { colorMode } = useColorMode();
    console.log(colorMode, theme);

    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <ColorModeProvider value={colorMode as "light" | "dark"}>{children}</ColorModeProvider>
        </ThemeProvider>
    );
}
