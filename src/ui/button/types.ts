export type ButtonsProps = {
  children: any;
  type: "submit" | "reset" | "button" | undefined;
  onClick: () => void
}