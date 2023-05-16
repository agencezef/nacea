import React from "react";

import { Title } from "../Typo/Title";

export function TitleContainer({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <div className="flex flex-row w-full items-center gap-2">
        <span className="w-full h-[1px] bg-gray"> </span>
        <Title size="medium" HTMLtag="h2">
          {title}
        </Title>
        <span className="w-full h-[1px] bg-gray"> </span>
      </div>

      <div className="max-w-[700px] w-full mx-0 my-auto px-6">
        <Title className="text-center " HTMLtag="h3">
          {subtitle}
        </Title>
      </div>
    </div>
  );
}
