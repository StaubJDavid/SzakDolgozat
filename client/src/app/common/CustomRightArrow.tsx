const CustomRightArrow = ({ onClick, ...rest }:any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button className="oreact-multiple-carousel__arrow oreact-multiple-carousel__arrow--right" onClick={() => onClick()} ></button>;
  };

export default CustomRightArrow;