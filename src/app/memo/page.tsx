"use client";

import { useState } from "react";

import { Icon } from "@iconify/react";

import type { Memo } from "@/lib/types";

import CategoryCard from "./_components/CategoryCard";

export default function MemoPage() {
  const [isEditing, setIsEditing] = useState(false);
  // const userId = "89eb1010-ca1e-414a-a3f2-3b35a994c4a6";

  const memoDummy: Memo = {
    General: [
      { id: "1", title: "1", description: "123", category: "General" },
      { id: "2", title: "2", description: "1234", category: "General" },
      {
        id: "3",
        title: "3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendissmalesuada lacus ex, sit amet blandit leo lobortis eget.",
        category: "General",
      },
    ],
    NextProject: [
      { id: "1", title: "1", description: "123", category: "NextProject" },
      { id: "2", title: "2", description: "1234", category: "NextProject" },
      {
        id: "3",
        title: "3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Suspendissmalesuada lacus ex sit amet blandit leo lobortis eget.",
        category: "NextProject",
      },
    ],
  };
  return (
    <>
      <div
        className="flex flex-col gap-y-5 bg-[#442B0D] px-10 py-5"
        style={{ height: "94vh" }}
      >
        <div className="flex flex-col gap-y-6">
          {/* Memo  && Edit Btn*/}
          <div className="flex flex-row justify-between">
            <div className="ml-2 text-lg font-bold text-zinc-200">Memo</div>
            <button
              className="pr-2"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              <Icon icon="fluent-emoji:pencil" style={{ fontSize: "28px" }} />
            </button>
          </div>

          {/* Category Card */}
          {Object.keys(memoDummy).map((catName) => (
            <CategoryCard
              key={catName}
              catName={catName}
              memos={memoDummy[catName]}
              isEditing={isEditing}
            />
          ))}
        </div>
      </div>
    </>
  );
}
