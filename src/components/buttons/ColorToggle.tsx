import { ButtonProps, IconButton, useColorMode } from "@chakra-ui/core";

export function ColorToggle(props: Omit<ButtonProps, "children">) {
    const { colorMode, toggleColorMode } = useColorMode();
    const icon = colorMode === "light" ? "moon" : "sun";

    return <IconButton aria-label="Color toggle" icon={icon} onClick={toggleColorMode} {...props} />;
}
