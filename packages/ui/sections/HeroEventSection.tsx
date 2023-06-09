import React from "react";
import { getUrl, HeroEventSectionType, useModal } from "utils";

import { CustomForm, CustomImage, Title, Wrapper } from "../components";
import { ModalNames } from "../components/Modals/ModalNames";

interface HeroMainProps {
  data: HeroEventSectionType;
}

export function HeroEventSection({ data }: HeroMainProps) {
  const { title, subtitle, form, image } = data;
  const { handleModal, modalData } = useModal();

  return (
    <div className="flex flex-col sm:flex-row max-w">
      <Wrapper classes="flex flex-col justify-center gap-6 md:gap-8 py-5 max-w-[800px] md:py-8 lg:py-16 ">
        <div className="flex flex-col gap-2.5 md:gap-4">
          <div className="flex flex-row justify-between">
            <Title className="w-full" size="big">
              {title}
            </Title>
          </div>
          <Title size="small" HTMLtag="h3">
            {subtitle}
          </Title>
        </div>
        {form && (
          <CustomForm
            form={form}
            callback={(result: any) =>
              handleModal({
                isOpen: ModalNames.CONTACT_MODAL,
                modalData: {
                  ...modalData,
                  event: result.event,
                  invite: result.invite,
                },
              })
            }
          />
        )}
      </Wrapper>

      <div className="sm:min-w-[400px] md:min-w-[550px] h-[480px] sm:h-[580px]">
        <CustomImage priority={true} alt={image.alt} src={getUrl(image.url)} />
      </div>
    </div>
  );
}
