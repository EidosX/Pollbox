export const SafeHSpace = (props: any) => {
  return (
    <div
      {...props}
      className={(props.className ?? '') + ' mx-auto max-w-5xl w-5/6 relative'}
    ></div>
  );
};
