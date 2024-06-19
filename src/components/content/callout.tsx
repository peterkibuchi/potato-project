import {
  CheckCircledIcon,
  CircleBackslashIcon,
  ExclamationTriangleIcon,
  FileTextIcon,
  InfoCircledIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";

import { cn } from "~/lib/utils";

interface CalloutProps {
  twClass?: string;
  children?: React.ReactNode;
  type?: keyof typeof dataCallout;
}

const dataCallout = {
  default: {
    icon: InfoCircledIcon,
    classes:
      "border-zinc-200 bg-gray-50 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200",
  },
  danger: {
    icon: ExclamationTriangleIcon,
    classes:
      "border-red-200 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200",
  },
  error: {
    icon: CircleBackslashIcon,
    classes:
      "border-red-200 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200",
  },
  idea: {
    icon: LightningBoltIcon,
    classes:
      "border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  },
  info: {
    icon: InfoCircledIcon,
    classes:
      "border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  },
  note: {
    icon: FileTextIcon,
    classes:
      "border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  },
  success: {
    icon: CheckCircledIcon,
    classes:
      "border-green-200 bg-green-50 text-green-800 dark:bg-green-400/20 dark:text-green-300",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    classes:
      "border-orange-200 bg-orange-50 text-orange-800 dark:bg-orange-400/20 dark:text-orange-300",
  },
};

export function Callout({
  children,
  twClass,
  type = "default",
  ...props
}: CalloutProps) {
  const { icon: Icon, classes } = dataCallout[type];

  return (
    <div
      className={cn(
        "mt-6 flex items-start space-x-3 rounded-lg border px-4 py-3 text-[15.6px] dark:border-none",
        classes,
        twClass,
      )}
      {...props}
    >
      <div className="mt-1 shrink-0">
        <Icon className="size-5" />
      </div>
      <div className="[&>p]:my-0">{children}</div>
    </div>
  );
}
