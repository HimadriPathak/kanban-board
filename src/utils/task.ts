export function getRandomColor() {
  const colors = [
    { light: "bg-red-100", dark: "dark:bg-red-300" },
    { light: "bg-yellow-100", dark: "dark:bg-yellow-300" },
    { light: "bg-green-100", dark: "dark:bg-green-300" },
    { light: "bg-blue-100", dark: "dark:bg-blue-300" },
    { light: "bg-purple-100", dark: "dark:bg-purple-300" },
    { light: "bg-pink-100", dark: "dark:bg-pink-300" },
    { light: "bg-orange-100", dark: "dark:bg-orange-300" },
  ];

  const { light, dark } = colors[Math.floor(Math.random() * colors.length)];
  return `${light} ${dark}`;
}
