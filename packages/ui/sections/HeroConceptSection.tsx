import React from "react";
import { getUrl, HeroConceptSectionType } from "utils";

import { CustomImage, Text, Title, Wrapper } from "../components";

interface HeroConceptProps {
  data: HeroConceptSectionType;
}

export function HeroConceptSection({ data }: HeroConceptProps) {
  const { title, subtitle, images, definition, cards } = data;

  return (
    <div className="relative">
      <div className="absolute md:top-10 sm:top-4 hidden sm:block sm:-left-32 md:-left-20  max-w-4">
        <CustomImage priority={true} alt="flowers" src="/flowers_pnh.png" />
      </div>
      <Wrapper classes="flex flex-col items-center gap-4 sm:px-16 md:max-w-[1200px]">
        <Title className="text-center" size="big">
          {title}
        </Title>
        <Title className="text-center" size="small" HTMLtag="h3">
          {subtitle}
        </Title>
      </Wrapper>
      <div className="flex flex-col md:mt-6">
        <div className="bg-beige flex flex-col gap-8 items-center px-8 py-6 sm:mx-[100px] sm:-mb-32 sm:z-50 md:flex-row md:items-start md:max-w-[1200px] md:py-8 md:px-16 md:justify-between">
          {cards.map((card: any, k: number) => (
            <div
              className="flex flex-col items-center gap-1 md:w-[350px]"
              key={k}
            >
              <div className="mb-2 w-[60px]">
                <CustomImage
                  priority={true}
                  alt={card.icon.alt}
                  src={getUrl(card.icon.url)}
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Title size="regular" className="text-center max-w-[250px]">
                  {card.title}
                </Title>
                <Text size="smallest" className="text-center">
                  {card.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2  sm:flex-row items-center">
          {images.map((image: any, k: number) => (
            <div key={k} className=" w-full h-[290px] sm:h-[400px]">
              <CustomImage
                priority={true}
                alt={image.alt}
                src={getUrl(image.url)}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{ backgroundColor: definition.backgroundColor }}
        className="w-full py-4 md:py-6 text-center px-[10%] sm:px-[3%]"
      >
        <Title size="medium" className="text-center text-white">
          {definition.label}
        </Title>
      </div>
    </div>
  );
}
