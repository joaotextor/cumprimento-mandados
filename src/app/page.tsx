"use client";
import MyComboBox from "@/components/MyComboBox";
import { cities } from "../cities.js";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import Image from "next/image.js";

import questionIcon from "../images/question-icon.png";

export default function Home() {
  const cityList: Array<string> = [""];
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [mandado, setMandado] = useState<boolean>(false);
  const [subsecao, setSubsecao] = useState<string>("");
  const [UAA, setUAA] = useState<string>("");

  const comCumprimento = "Há cumprimento de mandado";
  const semCumprimento = "Não há cumprimento de mandado";

  cities.forEach((city) => {
    city.cidadesAtendidas.forEach((cityName) => {
      if (!cityList.includes(cityName.name)) {
        cityList.push(cityName.name);
      }
    });
  });

  const handleInputChange = (value: string) => {
    setSelectedCity(value);
  };

  useEffect(() => {
    cities.forEach((city) => {
      for (let i = 0; i < city.cidadesAtendidas.length; i++) {
        if (city.cidadesAtendidas[i].name == selectedCity) {
          setMandado(city.cidadesAtendidas[i].mandado);
          setSubsecao(city.nomeCidade);
          setUAA(city.cidadesAtendidas[i].UAA);
        }
      }
    });
  }, [selectedCity]);

  return (
    <main className="h-screen flex flex-col p-2 items-center justify-center text-center">
      <h1 className="text-gray-200">Cumprimento de Mandados</h1>
      <div className="flex max-sm:flex-col max-sm:items-center">
        <h3 className="sm:mb-4 max-sm:mb-1 text-gray-200">
          Ferramenta para verificar se há cumprimento de mandados em cidades da
          JFRS
        </h3>
        <div className="h-full ml-1 mb-1">
          <a
            href="https://www.trf4.jus.br/trf4/upload/editor/2023/apb17_pu_20230814153858_rrt15_consolida_correg.htm#x6"
            target="_blank"
          >
            <Image
              data-tooltip-id="my-tooltip"
              src={questionIcon}
              alt="question mark"
              height={20}
            />
          </a>
        </div>
      </div>
      <Tooltip
        id="my-tooltip"
        place="top"
        variant="info"
        content="De acordo com o Anexo VI do Provimento/TRF4 nº 62"
      />
      <MyComboBox itemList={cityList} handleInputChange={handleInputChange} />
      {selectedCity != "" ? (
        <div className="text-gray-200 mt-2 flex flex-col items-center">
          <span className="font-bold">
            {mandado ? comCumprimento : semCumprimento}
          </span>
          <span>
            <span className="font-bold">Atendido por:</span>{" "}
            {UAA ? UAA : `Subseção de ${subsecao}`}
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="flex absolute bottom-1 text-gray-100 text-sm">
        <span>
          Desenvolvido por{" "}
          <a
            className="underline text-gray-300"
            href="https://github.com/joaotextor"
            target="_blank"
          >
            João Textor
          </a>
        </span>
      </div>
    </main>
  );
}
