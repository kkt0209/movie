import { create } from "zustand";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import dbApi from "db/DB";

const defaultFilms = [
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "687163",
    poster_path: "/qqGpVVZk2KD1lAvccgTU4Z6nh1H.jpg",
  },
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "1327819",
    poster_path: "/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg",
  },
];

const defaultMovieReviews = [
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "1523145",
    poster_path: "/iGpMm603GUKH2SiXB2S5m4sZ17t.jpg",
    writer: "kkt",
    content: "재미없어요 ㅜㅜ",
    rating: 1,
    createdAt: "2026. 4. 1.",
  },
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "1327819",
    poster_path: "/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg",
    writer: "kkt",
    content: "완전 재밌어요",
    rating: 5,
    createdAt: "2026. 4. 1.",
  },
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "687163",
    poster_path: "/qqGpVVZk2KD1lAvccgTU4Z6nh1H.jpg",
    writer: "kkt",
    content: "재밌었어요ㅎㅎ",
    rating: 5,
    createdAt: "2026. 4. 1.",
  },
];

const defaultWatchList = [
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    watchList: [
      { movieId: "83533", poster_path: "/l18o0AK18KS118tWeROOKYkF0ng.jpg" },
      { movieId: "1226863", poster_path: "/knaXOBDBecVBWZVup3zXaOoy23v.jpg" },
      { movieId: "1084242", poster_path: "/ib6v6qUXzez1x2qIOLN7C0yJNPQ.jpg" },
    ],
  },
];

const defaultLists = [
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    title: "재밌는 영화",
    desc: "올해 최고로 재밌는 영화",
    lists: [
      { movieId: "1268127", poster_path: "/f7sCSLEPRfV2fWQ0RYOtHhnHXuG.jpg" },
      { movieId: "1297842", poster_path: "/otP94vckeMXAgQxzhcRkZSeSmYv.jpg" },
      { movieId: "1327819", poster_path: "/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg" },
    ],
  },
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    title: "재미없는 영화",
    desc: "올해 최고로 재미없는 영화",
    lists: [
      { movieId: "1265609", poster_path: "/cfeIYPthWgq5XFZnx7cbpr7xFTp.jpg" },
      { movieId: "1159559", poster_path: "/gqgBqxyr8tGQGJCFrRWAzfA7Cml.jpg" },
      { movieId: "1171145", poster_path: "/77ggpowGO0ORQY9x33NeBIPajm1.jpg" },
    ],
  },
];

const defaultLikes = [
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "687163",
    poster_path: "/qqGpVVZk2KD1lAvccgTU4Z6nh1H.jpg",
  },
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "1226863",
    poster_path: "/knaXOBDBecVBWZVup3zXaOoy23v.jpg",
  },
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "1327819",
    poster_path: "/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg",
  },
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "83533",
    poster_path: "/l18o0AK18KS118tWeROOKYkF0ng.jpg",
  },
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "1268127",
    poster_path: "/f7sCSLEPRfV2fWQ0RYOtHhnHXuG.jpg",
  },
  {
    uid: "YwY5UFVvXkXcWWiZu83EoWfl1al1",
    movieId: "1297842",
    poster_path: "/otP94vckeMXAgQxzhcRkZSeSmYv.jpg",
  },
];

const useAppStore = create((set, get) => ({
  currentUser: null,
  currentUserInfo: null,
  movieReviews: defaultMovieReviews,
  userReviews: null,
  films: defaultFilms,
  watchList: defaultWatchList,
  lists: defaultLists,
  likes: defaultLikes,

  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),

  setCurrentUser: (loginUser) => set({ currentUser: loginUser }),
  setCurrentUserInfo: (loginUser) => set({ currentUserInfo: loginUser }),

  initApp: () => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const currentUserInfo = await dbApi.readUserInfo();
        const likeLists = await dbApi.getReviewLikes(currentUser.uid);

        set({
          currentUser,
          currentUserInfo,
          likes: likeLists || [],
        });

        console.log("로그인된 유저 : ", currentUser.uid);
      } else {
        set({
          currentUser: null,
          currentUserInfo: null,
        });

        console.log("로그아웃 상태");
      }
    });

    return () => unsubscribe();
  },

  updateUserInfo: async (uid, userInfo) => {
    await dbApi.updateUserInfo(uid, userInfo);

    set((state) => ({
      currentUserInfo: {
        ...state.currentUserInfo,
        ...userInfo,
      },
    }));
  },

  login: async (email, pwd) => {
    try {
      await dbApi.authLogin(email, pwd);
      return true;
    } catch (error) {
      console.error("로그인 실패:", error);
      return false;
    }
  },

  logout: () => {
    const auth = getAuth();
    signOut(auth);
  },

  addReview: async (movieReview) => {
    await dbApi.addDBReview(movieReview);

    set((state) => ({
      movieReviews: [...(state.movieReviews || []), movieReview],
    }));
  },

  getMovieReview: async (movieId) => {
    const movieReviews = await dbApi.getDBMovieReview(movieId);

    set(() => ({
      movieReviews: movieReviews || [],
    }));
  },

  getUserReview: async (uid) => {
    const userReviews = await dbApi.getDBUserReview(uid);

    set(() => ({
      userReviews: userReviews || [],
    }));
  },

  updateReview: async (reviewId, nextData) => {
  await dbApi.updateDBReview(reviewId, nextData);

  set((state) => ({
    userReviews: (state.userReviews || []).map((review) =>
      review.id === reviewId ? { ...review, ...nextData } : review
    ),
    movieReviews: (state.movieReviews || []).map((review) =>
      review.id === reviewId ? { ...review, ...nextData } : review
    ),
  }));
},

deleteReview: async (reviewId) => {
  await dbApi.deleteDBReview(reviewId);

  set((state) => ({
    userReviews: (state.userReviews || []).filter(
      (review) => review.id !== reviewId
    ),
    movieReviews: (state.movieReviews || []).filter(
      (review) => review.id !== reviewId
    ),
  }));
},

  addReviewLike: async (currentLiked, likedMovie, uid, movieId) => {
    await dbApi.addDBReviewLike(currentLiked, likedMovie, uid, movieId);

    set((state) => {
      const currentLikes = state.likes || [];
      const targetMovieId = String(movieId);
      const exists = currentLikes.some(
        (item) => item.uid === uid && String(item.movieId) === targetMovieId
      );

      return {
        likes: exists
          ? currentLikes.filter(
              (item) =>
                !(item.uid === uid && String(item.movieId) === targetMovieId)
            )
          : [...currentLikes, likedMovie],
      };
    });
  },

  checkReviewLike: async (uid, movieId) => {
    const result = await dbApi.checkDBReviewLike(uid, movieId);
    return !!result;
  },

  addList: async (list) => {
    await dbApi.addDBList(list);

    set((state) => ({
      lists: [...(state.lists || []), list],
    }));
  },

  toggleWatchLater: (movie) => {
    const user = get().currentUser;
    if (!user) return;

    const movieId = String(movie.movieId || movie.id);

    set((state) => {
      const safeWatchList = state.watchList || [];
      const targetIndex = safeWatchList.findIndex(
        (item) => item.uid === user.uid
      );

      const movieData = {
        movieId,
        poster_path: movie.poster_path,
        title: movie.title,
        release_date: movie.release_date,
      };

      if (targetIndex === -1) {
        return {
          watchList: [
            ...safeWatchList,
            {
              uid: user.uid,
              watchList: [movieData],
            },
          ],
        };
      }

      const nextWatchList = [...safeWatchList];
      const currentUserWatchList = nextWatchList[targetIndex].watchList || [];

      const exists = currentUserWatchList.some(
        (item) => String(item.movieId) === movieId
      );

      nextWatchList[targetIndex] = {
        ...nextWatchList[targetIndex],
        watchList: exists
          ? currentUserWatchList.filter(
              (item) => String(item.movieId) !== movieId
            )
          : [...currentUserWatchList, movieData],
      };

      return { watchList: nextWatchList };
    });
  },
}));

export default useAppStore;