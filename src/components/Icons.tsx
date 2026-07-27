import type { SVGProps } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  MessageCircle,
  Menu,
  Search,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowLeftIcon(props: IconProps) {
  return <ArrowLeft aria-hidden="true" {...props} />;
}

export function ArrowRightIcon(props: IconProps) {
  return <ArrowRight aria-hidden="true" {...props} />;
}

export function ChevronDownIcon(props: IconProps) {
  return <ChevronDown aria-hidden="true" {...props} />;
}

export function SearchIcon(props: IconProps) {
  return <Search aria-hidden="true" {...props} />;
}

export function VolumeIcon(props: IconProps) {
  return <Volume2 aria-hidden="true" {...props} />;
}

export function VolumeOffIcon(props: IconProps) {
  return <VolumeX aria-hidden="true" {...props} />;
}

export function MenuIcon(props: IconProps) {
  return <Menu aria-hidden="true" {...props} />;
}

export function CloseIcon(props: IconProps) {
  return <X aria-hidden="true" {...props} />;
}

export function SparkIcon(props: IconProps) {
  return <Sparkles aria-hidden="true" {...props} />;
}

export function CheckIcon(props: IconProps) {
  return <Check aria-hidden="true" {...props} />;
}

export function MessageIcon(props: IconProps) {
  return <MessageCircle aria-hidden="true" {...props} />;
}

