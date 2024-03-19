export default function Proposal(props: {
  params: { round: string; id: string };
}) {
  return (
    <p>
      {props.params.round}/{decodeURIComponent(props.params.id)}
    </p>
  );
}
