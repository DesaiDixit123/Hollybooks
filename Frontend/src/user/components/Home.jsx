// /* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import book_1 from "../assests/book-1.jpg";
import book_2 from "../assests/book-2.jpg";
import book_3 from "../assests/book-3.jpg";
import Allbooks from "./Books/Allbooks";
import { GoArrowUp } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { UserValidation } from "../../redux/ThunkApi";

export default function Home() {
  const dispacth = useDispatch();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispacth(UserValidation());
  }, []);

  const { userData } = useSelector((state) => state.MySliceProvider);

  console.log(userData);
  return (
    <>
      <Slider />
      <Allbooks limit={6} />

      <div
        className="w-[60px] bg-yellow-600 text-[60px] flex justify-center items-center rounded-full h-[60px] fixed bottom-[20px] z-40 right-[20px] cursor-pointer"
        onClick={scrollToTop}
      >
        <GoArrowUp />
      </div>
    </>
  );
}

export const Slider = () => {
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={book_1}
              className="d-block w-100"
              alt="Book 1"
              style={{ height: "500px", objectFit: "cover" }}
            />

            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
              <h5 className="text-warning">The Great Adventure</h5>
              <p className="text-light">
                Dive into the thrilling journey of a lifetime with "The Great
                Adventure". This book takes you through uncharted territories
                with captivating narratives and rich storytelling.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={book_2}
              className="d-block w-100"
              alt="Book 2"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
              <h5 className="text-warning">Mystery of the Unknown</h5>
              <p className="text-light">
                "Mystery of the Unknown" unravels a world of secrets and
                suspense. Immerse yourself in a narrative full of twists and
                turns that keep you guessing until the end.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={book_3}
              className="d-block w-100"
              alt="Book 3"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
              <h5 className="text-warning">Journey Through Time</h5>
              <p className="text-light">
                Embark on a historical odyssey with "Journey Through Time". This
                book explores pivotal events and remarkable characters that
                shaped the world as we know it.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};
