import { cva } from "class-variance-authority";
import { ClassValue } from "class-variance-authority/dist/types";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";
import { ButtonType } from "utils";

const globalClasses: string[] = [
  "rounded-br-xs",
  "rounded-tl-xs",
  "flex",
  "items-center",
  "justify-center",
  "text-white",
  "w-fit",
  "h-fit",
];

const button = cva(globalClasses, {
  variants: {
    size: {
      small: ["text-14", "py-2", "px-3", "w-full"],
      medium: ["text-14", "py-2.5 md:py-3", "px-5 md:px-6"],
      iconOnly: ["p-1.5"],
    },
    family: {
      montserrat: ["Montserrat"],
    },
  },
  defaultVariants: {
    size: "medium",
    family: "montserrat",
  },
});

export function Button({
  className,
  color,
  icon,
  submit,
  href,
  onclick,
  size,
  children,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const hoverColor = `${color + "d9"}`;
  const [colorState, setColorState] = useState(color);

  return (
    <button
      {...props}
      onClick={
        onclick
          ? () => onclick()
          : () => !submit && router.push(href ? href : router.asPath)
      }
      onMouseEnter={() => setColorState(hoverColor)}
      onMouseLeave={() => setColorState(color)}
      style={{ backgroundColor: colorState }}
      className={`${button({ size, className })}`}
      type={submit ? "submit" : "button"}
    >
      {children}
      {icon && (
        <span className={`${icon && "mx-2"} z-10 text-24 font-bold`}>
          {icon}
        </span>
      )}
    </button>
  );
}

Button.defaultProps = {
  icon: false,
  className: "",
  submit: false,
};

interface ButtonProps extends PropsWithChildren<any> {
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  className?: ClassValue;
  size?: "small";
  color: ButtonType["color"];
  href?: ButtonType["link"];
  submit?: boolean;
  onclick?: Function;
}
