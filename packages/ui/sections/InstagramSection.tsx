import { GetInstagramPosts, InstagramSectionType, Truncate } from "utils";

import { Button, Text, TitleContainer } from "../components";
import { Arrow } from "../svg";

interface InstagramSectionProps {
  data: InstagramSectionType;
}

export function InstagramSection({ data }: InstagramSectionProps) {
  const { title, subtitle, button } = data;
  const { posts, isPostsLoading } = GetInstagramPosts();

  if (isPostsLoading) {
    return <> Loading ... </>;
  }

  return (
    <div className="py-5 md:py-12 flex flex-col items-center">
      <TitleContainer title={title} subtitle={subtitle} />
      <div className="grid grid-cols-1 gap-6 md:gap-10 sm:grid-cols-2 md:grid-cols-instagram auto-cols-min justify-center mx-14 md:mx-32  my-16">
        {posts.map((postInsta: any, i: number) => (
          // eslint-disable-next-line @next/next/no-img-element
          <div
            key={i}
            className="relative group transition-all w-fit w-[300px] cursor-pointer"
          >
            <img
              alt="ee"
              className="object-cover rounded-xl group-hover:brightness-40 transition-all w-[320px] h-[280px]"
              src={postInsta.media_url}
            />
            <Text
              variations="white"
              size="smallest"
              className="absolute max-w-[70%] w-full text-center transition-all group-hover:opacity-100 opacity-0 z-40 bottom-6 left-[50%] translate-x-[-50%] "
            >
              {Truncate(postInsta.caption, 70)}
            </Text>
          </div>
        ))}
      </div>
      {button && (
        <Button icon={<Arrow />} color={button.color} href={button.link}>
          {button.label}
        </Button>
      )}
    </div>
  );
}
