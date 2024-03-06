"use client";
import { AuthService, DBService } from "@/service";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useState, useEffect } from "react";

export function Charts() {
  const [data, setData] = useState<any[]>([]);

  const authService = AuthService.getInstance();
  const dbService = DBService.getInstance();

  const fetchData = async () => {
    const res: any = await authService.getAccount();
    dbService
      .getDocumentsOfTypeCategory(res["$id"])
      .then((res) => {
        setData(res.documents);
      })
      .catch((error: any) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dynamicData = data.reduce((acc, item) => {
    const existingItem = acc.find((i: any) => i.category === item.category);

    if (existingItem) {
      existingItem.value += item.amount;
    } else {
      acc.push({
        category: item.category,
        type: item.type,
        value: item.amount,
      });
    }

    return acc;
  }, []);

  const styleCategory = (category: any) => {
    if (category === "Food & Beverages") {
      return "#ccb79c";
    } else if (category === "Salary") {
      return "#638889";
    } else if (category === "Entertainment") {
      return "#FFCF81";
    } else if (category === "Transportation") {
      return "#7BD3EA";
    } else if (category === "Fashion") {
      return "#E493B3";
    } else if (category === "Gift") {
      return "#BBC3A4";
    }
  };

  const indonesianCurrency = (amount: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const labelFormat = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, value, percent } =
      props;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <>
        <text
          x={x}
          y={y}
          fill="#78A083"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          className="hidden font-bold md:block"
        >
          {indonesianCurrency(value)}
        </text>
        <text
          x={x}
          y={y}
          dx={109}
          dy={6}
          textAnchor={x > cx ? "start" : "end"}
          fill="#cccccc"
          className="hidden font-semibold md:block"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </>
    );
  };

  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className="hidden md:block">
        <ul className="flex justify-center space-x-5">
          {payload.map((entry: any, index: number) => {
            const color = styleCategory(entry.payload.category);
            return (
              <li
                key={`item-${index}`}
                className={`flex items-center text-[${color}]`}
              >
                <svg height="10" width="10">
                  <circle cx="5" cy="5" r="4" fill={color} />
                </svg>
                <span className="ml-2">{entry.payload.category}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={dynamicData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={labelFormat}
            outerRadius={100}
            dataKey="value"
            legendType="circle"
          >
            {dynamicData.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={styleCategory(entry.category)}
              />
            ))}
          </Pie>
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
