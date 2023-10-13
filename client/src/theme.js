
export const colorTokens = {
    grey: {
        0: "#FFFFFF",
        10: "#F6F6F6",
        50: "#F0F0F0",
        75: "#E8E8E8",
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
        700: "#009900",
        800: "#004000",
        900: "#001a00"
    }
}

export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            // ...(mode === 'dark' ? {
            //     /* DARK MODE COLORS */
            //     primary: {
            //         dark: colorTokens.primary[200],
            //         main: colorTokens.primary[400],
            //         light: colorTokens.primary[600]
            //     },
            //     neutral: {
            //         dark: colorTokens.grey[50],
            //         almostDark: colorTokens.grey[100],
            //         darkMain: colorTokens.grey[200],
            //         main: colorTokens.grey[300],
            //         medium: colorTokens.grey[400],
            //         light: colorTokens.grey[700],
            //         veryLight: colorTokens.grey[800]
            //     },
            //     background: {
            //         default: colorTokens.grey[900],
            //         alt: colorTokens.grey[700]
            //     }
            // } : {
                /* LIGHT MODE COLORS */
            ...{
                primary: {
                    dark: colorTokens.primary[700],
                    main: colorTokens.primary[700],
                    light: colorTokens.primary[400]
                },
                neutral: {
                    dark: colorTokens.grey[800],
                    almostDark: colorTokens.grey[700],
                    darkMain: colorTokens.grey[600],
                    main: colorTokens.grey[400],
                    medium: colorTokens.grey[200],
                    light: colorTokens.grey[75],
                    veryLight: colorTokens.grey[50]
                },
                background: {
                    default: colorTokens.grey[10],
                    alt: colorTokens.grey[100]
                }
            }
            //)
        },
        typography: {
            fontFamily: ["Poppins", 'Kica'].join(","),
            fontSize: 12,
            h0: {
                fontFamily: ['Poppins'].join(","),
                fontSize: 50,
                fontWeight: 500
            },
            h1: {
                fontFamily: ['Kica'].join(","),
                fontSize: 80,
                fontWeight: 500
            },
            h2: {
                fontFamily: ["Poppins", 'Kica'].join(","),
                fontSize: 32,
                fontWeight: 500
            },
            h3: {
                fontFamily: ["Poppins", 'Kica'].join(","),
                fontSize: 24,
                fontWeight: 500
            },
            h4: {
                fontFamily: ["Poppins", 'Kica'].join(","),
                fontSize: 20,
                fontWeight: 500
            },
            h5: {
                fontFamily: ["Poppins", 'Kica'].join(","),
                fontSize: 18,
                fontWeight: 500
            },
            h6: {
                fontFamily: ["Poppins", 'Kica'].join(","),
                fontSize: 14,
                fontWeight: 500
            },
            watermark: {
                fontFamily: ['Kica'].join(","),
                fontSize: 16,
                
            }
        }
    }
}