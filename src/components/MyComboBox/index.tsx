"use client";
import React, { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

interface MyComboBoxProps {
  itemList: string[];
  handleInputChange: (value: string) => void;
}

const MyComboBox = (
  { itemList, handleInputChange }: MyComboBoxProps,
  ...props: Array<React.HTMLAttributes<HTMLInputElement>>
) => {
  const [selectedCity, setSelectedCity] = useState(itemList[0]);
  const [query, setQuery] = useState("");

  const filteredCity =
    query === ""
      ? itemList
      : itemList.filter((city: string) => {
          return city.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (value: string) => {
    setSelectedCity(value);
    handleInputChange(value);
  };

  return (
    <Combobox
      value={selectedCity}
      onChange={(event) => handleChange(event)}
      {...props}
    >
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            className="border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            placeholder="Informe a cidade"
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCity.map((city: string) => (
              <Combobox.Option
                key={city}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-eproc-secondary text-white" : "text-gray-900"
                  }`
                }
                value={city}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {city}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-teal-600"
                        }`}
                      ></span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default MyComboBox;
