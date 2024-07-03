export const nameInitials = (name: string) => {
  if (!name || name.length <= 2) return name.toUpperCase();

  let words = name.split(" ");

  if (words.length > 1)
    return (
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase()
    );

  return words[0].charAt(0).toUpperCase();
};
