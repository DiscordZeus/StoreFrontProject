"use client";
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper"
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import "./styles.css"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../../../products/components/thumbnail"
import PreviewPrice from "../../../products/components/product-preview/price"

SwiperCore.use([Navigation, Pagination, Autoplay]);

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface PriceType {
  calculated_price: string | null;
  original_price: string | null;
  difference: string | null;
  price_type: "default" | "sale" | null;
}

interface ProductPreviewType {
  id: string;
  title: string;
  handle: string | null;
  thumbnail: string | null;
  price: PriceType | undefined; // Adjust to allow for undefined values
}

interface ProductCollectionWithPreviews {
  id: string;
  title: string;
  products: ProductPreviewType[];
}

interface Swiperz2Props {
  classAdded: string;
  itemsArray: ProductCollectionWithPreviews[];
}


const Swiperz2: React.FC<Swiperz2Props> = ({ classAdded, itemsArray }) => {
  return (
    <>
        <div className='mt-10'>
          <h2 className='text-center font-bold text-3xl '>Sales & Special Offers </h2>
        </div>
      <Swiper
        className='mt-10 w-5/6'
        spaceBetween={60}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        navigation
        breakpoints={{
          510: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
          1536: { slidesPerView: 3 },
        }}
      >
        {itemsArray.map((item, index) => (
          
          <div key={index} >
            {item.products.map((singleItem, productIndex) => (
              <>
              {singleItem.price?.price_type === "sale" && 
              
              <SwiperSlide key={productIndex}>
                  <div className="relative mb-6">
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-1 px-2 rounded-md z-10 w-[5rem] text-xl font-bold"
                    >
                      Sales
                    </div>
                    </div>


                <LocalizedClientLink
                  href={`/products/${singleItem.handle}`}
                  className="group"
                >
                    <div>

                      <Thumbnail thumbnail={singleItem.thumbnail} size="square" />
                      <div className="flex txt-compact-medium mt-4 justify-between">
                        <Text className="text-ui-fg-subtle" data-testid="product-title">
                          {singleItem.title}
                        </Text>
                        <div className="flex items-center gap-x-2">
                          <div className='line-through'>{singleItem.price?.original_price}</div>
                          {<div className='text-red-500'>{singleItem.price?.calculated_price}</div>}
                        </div>
                      </div>
                    </div>
                  

                </LocalizedClientLink>

              </SwiperSlide>
            }
              </>
              ))}




          </div>
        ))}





      </Swiper>
    </>
  );
}

export default Swiperz2;