"use client";

import Txt from "@/components/common/Txt.component";
import {
  type ApplicationAddText,
  ApplicationNode,
} from "@/src/constants/application/type";

import { useState } from "react";
import ApplicationText from "./Text.component";
import { getLocalStorage } from "@/src/utils/applicant";
import { portfolioCategory } from "@/src/constants/application";

interface ApplicationAddTextProps {
  data: ApplicationNode;
}

const ApplicationAddText = ({ data }: ApplicationAddTextProps) => {
  const localStorageData = getLocalStorage(portfolioCategory);

  const textData = data as ApplicationAddText;

  const id = Date.now().toString();

  const [selectedCategories, setSelectedCategories] = useState<
    { category: string; id: string; value: string }[]
  >(
    localStorageData.length === 0
      ? [{ category: "Github", id, value: "" }]
      : localStorageData
  );

  const onAddCategory = () => {
    const newId = Date.now().toString();

    setSelectedCategories([
      ...selectedCategories,
      { category: "Github", id: newId, value: "" },
    ]);
  };

  return (
    <>
      {textData.title && (
        <div className="flex flex-row justify-between">
          <label>
            <Txt typography="h6">{`${textData.title} ${textData.alert}`}</Txt>
          </label>
          <button
            onClick={onAddCategory}
            className="ml-2 border p-2 rounded-lg"
          >
            +추가
          </button>
        </div>
      )}
      {selectedCategories.map((selectedCategory) => (
        <ApplicationUrlText
          selectedCategory={selectedCategory}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          textData={textData}
          key={selectedCategory.id}
        />
      ))}
    </>
  );
};

export default ApplicationAddText;

interface ApplicationUrlTextProps {
  selectedCategory: { category: string; id: string; value: string };
  selectedCategories: { category: string; id: string; value: string }[];
  setSelectedCategories: (
    categories: { category: string; id: string; value: string }[]
  ) => void;
  textData: ApplicationAddText;
}

const ApplicationUrlText = ({
  selectedCategory,
  selectedCategories,
  setSelectedCategories,
  textData,
}: ApplicationUrlTextProps) => {
  const onCategoryChange = (id: string, value: string) => {
    const prevCategory = selectedCategory.category;
    const prevCategoryData = localStorage.getItem(`${prevCategory} - ${id}`);
    const newCategories = [...selectedCategories];

    localStorage.removeItem(`${prevCategory} - ${id}`);

    newCategories.forEach((category) => {
      if (category.id === id) {
        category.category = value;
      }
    });

    prevCategoryData &&
      localStorage.setItem(`${value} - ${id}`, prevCategoryData);

    setSelectedCategories(newCategories);
  };

  const onRemoveCategory = (
    id: string,
    selectedCategory: { category: string; id: string }
  ) => {
    const newCategories = selectedCategories.filter(
      (category) => category.id !== id
    );

    localStorage.removeItem(`${selectedCategory.category} - ${id}`);
    setSelectedCategories(newCategories);
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <select
        onChange={(e) => onCategoryChange(selectedCategory.id, e.target.value)}
        className="border my-2 rounded-lg p-4"
        value={selectedCategory.category}
      >
        {textData.category.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <ApplicationText
        data={{
          ...textData,
          title: "",
          name: `${selectedCategory.category} - ${selectedCategory.id}`,
        }}
      />
      <button
        onClick={() => onRemoveCategory(selectedCategory.id, selectedCategory)}
        className="border rounded-full h-10 my-2 p-2 w-10"
      >
        -
      </button>
    </div>
  );
};
