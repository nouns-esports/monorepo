export default async function Cast(props: {
  params: { channel: string; cast: string };
}) {
  return `Hello, ${props.params.channel} ${props.params.cast}!`;
}
