import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { cardVariants } from "./cardVariants";

const Card = ({
  children,
  variant,
  padding,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          cardVariants({
            variant,
            padding,
          }),
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;