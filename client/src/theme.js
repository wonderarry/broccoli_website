

export const colorTokens = {
    grey: {
        0: "#FFFFFF",
        10: "#F6F6F6",
        50: "#F0F0F0",
        100: "#E0E0E0",
        200: "#C2C2C2",
        300: "#A3A3A3",
        400: "#858585",
        500: "#666666",
        600: "#4D4D4D",
        700: "#333333",
        800: "#1A1A1A",
        900: "#0A0A0A",
        1000: "#000000",
    },
    primary: {
        50: "#e6ffe6",
        100: "#ccffcc",
        200: "#97fc97",
        300: "#65fc65",
        400: "#32fa32",
        500: "#00fa00",
        600: "#00bd00",
        700: "#007d00",
        800: "#004000",
        900: "#001a00"
    }
}

export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark' ? {
                /* DARK MODE COLORS */
                primary: {
                    dark: colorTokens.primary[200],
                    main: colorTokens.primary[500],
                    light: colorTokens.primary[800]
                },
                neutral: {
                    dark: colorTokens.grey[100],
                    main: colorTokens.grey[200],
                    mediumMain: colorTokens.grey[300],
                    medium: colorTokens.grey[400],
                    light: colorTokens.grey[700]
                },
                background: {
                    default: colorTokens.grey[900],
                    alt: colorTokens.grey[800]
                }
            } : {
                /* LIGHT MODE COLORS */
                primary: {
                    dark: colorTokens.primary[700],
                    main: colorTokens.primary[500],
                    light: colorTokens.primary[50]
                },
                neutral: {
                    dark: colorTokens.grey[700],
                    main: colorTokens.grey[500],
                    mediumMain: colorTokens.grey[400],
                    medium: colorTokens.grey[300],
                    light: colorTokens.grey[50]
                },
                background: {
                    default: colorTokens.grey[10],
                    alt: colorTokens.grey[0]
                }
            })
        },
        typography: {
            fontFamily: ["Inter", "Helvetica"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Inter", "Helvetica"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Inter", "Helvetica"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Inter", "Helvetica"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Inter", "Helvetica"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Inter", "Helvetica"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Inter", "Helvetica"].join(","),
                fontSize: 14,
            },
        }
    }
}