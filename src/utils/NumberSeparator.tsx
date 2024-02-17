const NumberSeparator = ({ number }: { number: number }) => {
  const addCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return <div>{addCommas(number)}</div>;
};

export default NumberSeparator;
