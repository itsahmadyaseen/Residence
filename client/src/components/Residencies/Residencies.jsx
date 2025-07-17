import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./Residencies.css";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";

const Residencies = () => {
  const { plots, rentals, isLoading, isError } = useProperties();

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        {/* ==== Plots ==== */}
        <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Plots</span>
        </div>
        <Swiper {...sliderSettings}>
          <SlideNextButton />
          {plots.slice(0, 8).map((card, i) => (
            <SwiperSlide key={`plot-${i}`}>
              <PropertyCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ==== Rentals ==== */}
        <div className="flexColStart r-head" style={{ marginTop: "4rem" }}>
          <span className="orangeText">Top Rated</span>
          <span className="primaryText">Popular Rentals</span>
        </div>
        <Swiper {...sliderSettings}>
          <SlideNextButton />
          {rentals.slice(0, 8).map((card, i) => (
            <SwiperSlide key={`rental-${i}`}>
              <PropertyCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Residencies;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
