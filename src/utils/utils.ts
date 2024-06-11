export const colorClass = (isDarkMode: boolean) => {
  return `${isDarkMode ? "dark" : "light"}-text`;
};

export const bgClass = (isDarkMode: boolean) => {
  return `bg-${isDarkMode ? "dark" : "light"}`;
};
