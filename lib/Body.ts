type Body =
  { [key: string] : string | string[] | number | number[] | null | Body | Body[] }
  | Body[]
  | string
  | undefined;

export default Body;
