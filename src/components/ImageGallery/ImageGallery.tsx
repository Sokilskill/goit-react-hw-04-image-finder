import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Loader from "../Loader/Loader";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import css from "./ImageGallery.module.css";
import { fetchSearch } from "../../api/pixabayAPI";
import { scrollToTop } from "../../utils";

enum Status {
  IDLE = "idle",
  PENDING = "pending",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

interface ImageGalleryProps {
  searchQuery: string;
}

interface ImageDataProps {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ searchQuery }) => {
  const [dataQuery, setDataQuery] = useState<ImageDataProps[]>([]);
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [totalHits, setTotalHits] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (!searchQuery) return;

    setPage(1);
    setStatus(Status.PENDING);

    const fetch = async () => {
      try {
        const data = await fetchSearch({ query: searchQuery });

        if (data.totalHits === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again."
          );
          setStatus(Status.IDLE);
          return;
        }

        setTotalHits(data.totalHits);
        setDataQuery(data.hits);
        setStatus(Status.RESOLVED);

        toast.success(`Hooray! We found ${data.totalHits} images.`);
        scrollToTop();
      } catch (error: any) {
        toast.error(error.message);
        console.error(error);
        setStatus(Status.REJECTED);
      }
    };

    fetch();
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1 || status === Status.PENDING) return;

    const fetchMoreData = async () => {
      try {
        const data = await fetchSearch({
          query: searchQuery,
          currentPage: page,
        });

        setDataQuery((prevState) => [...prevState, ...data.hits]);
        setStatus(Status.RESOLVED);
      } catch (error: any | unknown) {
        toast.error(error.message);
        setStatus(Status.REJECTED);
      }
    };

    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  const fetchLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <div className="container">
      {dataQuery.length !== 0 && (
        <>
          <p>
            Search on the site
            <b style={{ fontWeight: "bold" }}>"{searchQuery}"</b>
          </p>
          <ul className={css.imageGallery}>
            {dataQuery.map((data) => (
              <ImageGalleryItem key={data.largeImageURL} imagePreview={data} />
            ))}
          </ul>
        </>
      )}

      {status === Status.PENDING && <Loader />}

      {totalHits !== dataQuery.length && status !== Status.PENDING && (
        <Button onClick={fetchLoadMore}>Load More</Button>
      )}
    </div>
  );
};

export default ImageGallery;
