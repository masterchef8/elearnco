import { Image } from "@nextui-org/react";
import React from "react";
import { GenericObject } from "schemas";
const Collection = (props: {
  collection: GenericObject[];
  totalPages: number;
  currentPage: number;
  _handleClick: (str: string) => void;
  _handlePageChange: (val: number) => void;
}) => {
  const {
    collection,
    _handleClick,
  } = props;

  return (
    <div className="relative">
     
      <div className="grid grid-cols-4 gap-4 mx-auto">
        {collection?.map((image)=> {
          return (
            <div
              key={image.id}
              className="relative overflow-hidden cursor-pointer"
              onClick={() =>
                _handleClick(
                  image?.urls?.regular
                    ? image.urls.regular
                    : image.largeImageURL
                )
              }
            >
              <Image
                width="100%"
                height="auto"
                src={
                  image?.urls?.regular ? image.urls.regular : image.previewURL
                }
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Collection;
