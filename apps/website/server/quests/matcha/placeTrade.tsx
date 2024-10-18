import createAction from "../createAction";
import { env } from "~/env";

export const placeTrade = createAction<{
  chain?: string;
  token?: string;
  symbol?: string;
}>(async (actionInputs) => {
  if (actionInputs.chain || actionInputs.token || actionInputs.symbol) {
    if (!actionInputs.chain) {
      throw new Error("Chain input missing in action");
    }

    if (!actionInputs.token) {
      throw new Error("Token input missing in action");
    }

    if (!actionInputs.symbol) {
      throw new Error("Symbol input missing in action");
    }
  }

  return {
    description: (
      <p>
        Place a trade{" "}
        {actionInputs.token ? (
          <>
            for <span className="text-red">${actionInputs.symbol}</span>{" "}
          </>
        ) : (
          <></>
        )}
        on <span className="text-red">Matcha</span>
      </p>
    ),
    url: actionInputs.token
      ? `/matcha/tokens/${actionInputs.chain}/${actionInputs.token}`
      : "/matcha",
    check: async (user) => {
      if (!user.wallet) return false;

      if (actionInputs.token) {
        const response = await fetch(
          "https://trade-history.spaceship.0x.org/v1/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "0x-api-key": env.MATCHA_API_KEY,
            },
            body: JSON.stringify({
              query: `
            query MyQuery {
              tradesMatcha(
                limit: 1
                where: {_and: [{_or: [{taker: {_eq: "${user.wallet.address.toLowerCase()}"}}, {maker: {_eq: "${user.wallet.address.toLowerCase()}"}}]}, {_or: [{takerToken: {_eq: "${actionInputs.token.toLowerCase()}"}}, {makerToken: {_eq: "${actionInputs.token.toLowerCase()}"}}]}]}
              ) {
                transactionHash
              }
            }
          `,
            }),
          }
        );

        if (!response.ok) return false;

        const trades = (
          (await response.json()) as {
            data: { tradesMatcha: Array<{ transactionHash: string }> };
          }
        ).data.tradesMatcha;

        if (trades.length < 1) return false;

        return true;
      }

      const response = await fetch(
        "https://trade-history.spaceship.0x.org/v1/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "0x-api-key": env.MATCHA_API_KEY,
          },
          body: JSON.stringify({
            query: `
            query MyQuery {
              tradesMatcha(
                limit: 1
                where: {taker: {_eq: "${user.wallet.address.toLowerCase()}"}}
              ) {
                transactionHash
              }
            }
          `,
          }),
        }
      );

      if (!response.ok) return false;

      const trades = (
        (await response.json()) as {
          data: { tradesMatcha: Array<{ transactionHash: string }> };
        }
      ).data.tradesMatcha;

      if (trades.length < 1) return false;

      return true;
    },
  };
});
