import { permanentRedirect } from "next/navigation";

export default function OrderPortraitRedirect() {
  permanentRedirect("/art/order");
}
