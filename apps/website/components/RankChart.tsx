"use client";

import { LineChart, Line, ResponsiveContainer, ReferenceArea } from "recharts";
import type { Rank } from "~/packages/db/schema";

export default function RankChart(props: { rank: Rank; ranks: Rank[] }) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="rounded-lg overflow-hidden"
    >
      <LineChart
        data={[
          { name: "May", rank: 0 },
          { name: "June", rank: 1 },
          { name: "July", rank: 3 },
          { name: "August", rank: 6 },
          { name: "September", rank: 7 },
        ]}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <Line
          type="monotone"
          dataKey="rank"
          stroke="#F2F2F2"
          dot={false}
          strokeWidth={2}
        />
        {props.ranks.map((rank, index) => {
          const sectionHeight = (props.ranks.length - 1) / 3;
          return (
            <ReferenceArea
              key={rank.name}
              y1={index * sectionHeight}
              y2={(index + 1) * sectionHeight}
              fill={
                index === 0 ? "#789AF4" : index === 1 ? "#BC30ED" : "#E93737"
              }
              fillOpacity={0.3}
            ></ReferenceArea>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
