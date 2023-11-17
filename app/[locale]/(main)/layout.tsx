import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function InfoLayout(props: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <Header locale={props.params.locale} />
      {props.children}
      <Footer locale={props.params.locale} />
    </>
  );
}
