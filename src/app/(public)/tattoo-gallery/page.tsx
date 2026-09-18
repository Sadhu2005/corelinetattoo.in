import { permanentRedirect } from "next/navigation";

export default function TattooGalleryRedirect() {
  permanentRedirect("/tattoo/designs");
}
