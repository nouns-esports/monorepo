import { redirect } from "next/navigation";

export default function Collect(props: { params: { locale: string } }) {
  redirect(`/${props.params.locale}/collect/esports-summer`);
}
