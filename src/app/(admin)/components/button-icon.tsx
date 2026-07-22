import { cva, type VariantProps } from "class-variance-authority";
import Icon from "./icon";
import Skeleton from "./skeleton";
import SpinnerIcon from "../assets/icons/spinner.svg";


export const buttonIconVariants = cva(
  `
  inline-flex items-center justify-center cursor-pointer transition group
`,
  {
    variants: {
      variant: {
        none: "",
        primary: "bg-green-base hover:bg-green-dark",
        secondary: "bg-gray-200 hover:bg-pink-base",
        tertiary: "bg-transparent hover:bg-blue-300",
      },
      size: {
        sm: "w-6 h-6 p-1 rounded",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
      },
      handling: {
        true: "pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
      disabled: false,
      handling: false,
    },
  }
);

interface ButtonIconProps extends Omit<React.ComponentProps<"button">, "disabled" | "size">, VariantProps<typeof buttonIconVariants> {
  icon: React.ComponentProps<typeof Icon>["svg"];
  loading?: boolean;
  handling?: boolean;
}

export const buttonIconIconVariants = cva("transition", {
  variants: {
    variant: {
      none: "",
      primary: "fill-none stroke-white group-hover:stroke-green-600",
      secondary: "fill-none stroke-red-500 group-hover:stroke-red-600",
      tertiary: "fill-none stroke-gray-300 group-hover:stroke-gray-400",
    },
    size: {
      sm: "w-4 h-4",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});

export default function ButtonIcon({ variant, size, disabled, className, loading, handling, icon, ...props }: ButtonIconProps) {
    if (loading) {
      return (
        <Skeleton
          rounded="sm"
          className={buttonIconVariants({ variant: "none", size, className })}
        />
      );
    }
    
  return (
    <button className={buttonIconVariants({ className, variant, size, disabled })} {...props}>
      <Icon className={buttonIconIconVariants({ size, variant })} animate={handling} svg={handling ? SpinnerIcon : icon} />
    </button>
  );
}