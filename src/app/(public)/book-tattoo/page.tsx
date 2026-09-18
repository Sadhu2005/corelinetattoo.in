import { permanentRedirect } from "next/navigation";

export default function BookTattooRedirect() {
  permanentRedirect("/tattoo/book");
}
