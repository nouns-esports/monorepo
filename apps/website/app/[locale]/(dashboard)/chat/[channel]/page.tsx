export default function Channel(props: { params: { channel: string } }) {
  return <p>{props.params.channel}</p>;
}
