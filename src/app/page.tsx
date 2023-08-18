"use client";
import MyComboBox from "@/components/MyComboBox";
import { cities } from "../cities.js";

export default function Home() {
  const cityList: Array<string> = [""];

  cities.forEach((city) => {
    city.cidadesAtendidas.forEach((cityName) => {
      if (!cityList.includes(cityName.name)) {
        cityList.push(cityName.name);
      }
    });
  });

  return (
    <main className="h-screen flex p-2 items-center justify-center">
      <MyComboBox itemList={cityList as string[]} />
    </main>
  );
}
