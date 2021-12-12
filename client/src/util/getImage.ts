const getImage = (image: string): string => {
  return image ? `http://localhost:3400/static/images/${image}` : "";
};
export default getImage;
