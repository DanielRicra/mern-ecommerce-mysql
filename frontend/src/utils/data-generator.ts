const getDataForSelectUIComponent = (start: number, stock: number): string[] => {
  const data: string[] = [];
  for (let i = start; i <= stock; i += 1) {
    data.push(i.toString());
  }
  return data;
};

export default getDataForSelectUIComponent;
