import axios from "axios";

const API_KEY = "38642451-6ca93df2512694306dc1a1cd7";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 12;

interface FetchSearchParams {
  query: string;
  currentPage?: number;
}

interface ImageHit {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
}

interface FetchSearchResponse {
  totalHits: number;
  hits: ImageHit[];
  total: number;
}

export const fetchSearch = async ({
  query,
  currentPage = 1,
}: FetchSearchParams): Promise<FetchSearchResponse> => {
  const { data } = await axios.get<FetchSearchResponse>(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${currentPage}`
  );
  return data;
};
