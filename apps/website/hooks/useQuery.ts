import useSWR from "swr";

export function useQuery<
  TQueryFn extends Function & ((...args: any) => any),
  TArgs extends TQueryFn["arguments"],
>(props: { key: string; queryFn: TQueryFn; args: TArgs; canQuery: boolean }) {
  return useSWR<ReturnType<TQueryFn>>(
    props.canQuery ? [props.key, props.args] : null,
    props.canQuery ? async () => props.queryFn(props.args) : null
  );
}
