export const breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
};
export const responsiveSpacing = {
    padding: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
    },
    margin: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
    },
    gap: {
        xs: 1,
        sm: 2,
        md: 3,
    },
};
export const responsiveContainers = {
    page: {
        maxWidth: 'lg',
        sx: {
            px: { xs: 1, sm: 2, md: 3 },
            py: { xs: 2, sm: 3, md: 4 },
        },
    },
    modal: {
        maxWidth: { xs: 'xs', sm: 'sm', md: 'md' },
        sx: {
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
        },
    },
    cardGrid: {
        container: true,
        spacing: { xs: 2, sm: 3, md: 4 },
    },
};
export const responsiveGridSizes = {
    threeColumn: { xs: 12, sm: 6, md: 4 },
    twoColumn: { xs: 12, sm: 6 },
    mainContent: { xs: 12, md: 8 },
    sidebar: { xs: 12, md: 4 },
    fullWidth: { xs: 12 },
    halfWidth: { xs: 12, sm: 6 },
};
export const responsiveTypography = {
    hero: {
        variant: 'h1',
        sx: {
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 'bold',
            textAlign: { xs: 'center', md: 'left' },
        },
    },
    section: {
        variant: 'h4',
        sx: {
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            fontWeight: 600,
            mb: { xs: 2, sm: 3 },
        },
    },
    cardTitle: {
        variant: 'h6',
        sx: {
            fontSize: { xs: '1rem', sm: '1.125rem' },
            fontWeight: 500,
        },
    },
};
export const responsiveButtons = {
    primary: {
        size: { xs: 'medium', sm: 'large' },
        sx: {
            px: { xs: 2, sm: 4 },
            py: { xs: 1, sm: 1.5 },
        },
    },
    secondary: {
        size: { xs: 'small', sm: 'medium' },
        sx: {
            px: { xs: 1.5, sm: 2 },
        },
    },
};
export const getResponsiveValue = (theme, values) => {
    return Object.entries(values).reduce((acc, [breakpoint, value]) => {
        acc[theme.breakpoints.up(breakpoint)] = value;
        return acc;
    }, {});
};
export const useResponsiveValue = (values) => {
    return { xs: values.xs, sm: values.sm, md: values.md, lg: values.lg, xl: values.xl };
};
export const responsiveCardStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: { xs: 1, sm: 2 },
    borderRadius: 2,
};
export const responsiveFormStyles = {
    container: {
        spacing: { xs: 2, sm: 3 },
    },
    field: {
        size: 'small',
        fullWidth: true,
        sx: {
            mb: { xs: 1, sm: 2 },
        },
    },
    buttonGroup: {
        direction: { xs: 'column', sm: 'row' },
        spacing: { xs: 1, sm: 2 },
        sx: {
            mt: { xs: 2, sm: 3 },
            width: { xs: '100%', sm: 'auto' },
        },
    },
};
export default {
    breakpoints,
    responsiveSpacing,
    responsiveContainers,
    responsiveGridSizes,
    responsiveTypography,
    responsiveButtons,
    responsiveCardStyles,
    responsiveFormStyles,
    getResponsiveValue,
    useResponsiveValue,
};