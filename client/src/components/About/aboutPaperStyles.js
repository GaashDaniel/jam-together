export const getAboutPaperStyles = (theme, mode) => ({
  p: 4,
  mb: 4,
  background:
    mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
      : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
  border: `1px solid ${theme.palette.divider}`,
});