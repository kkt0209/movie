import { create } from "zustand";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import dbApi from "db/DB";

const defaultFilms = [
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "687163", poster_path: '/qqGpVVZk2KD1lAvccgTU4Z6nh1H.jpg' },
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "1327819", poster_path: '/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg' },
];

const defaultMovieReviews = [
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "1523145", poster_path: '/iGpMm603GUKH2SiXB2S5m4sZ17t.jpg', writer: "kkt", content: "재미없어요 ㅜㅜ", rating: 1, createdAt: "2026. 4. 1." },
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "1327819", poster_path: '/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg', writer: "kkt", content: "완전 재밌어요", rating: 5, createdAt: "2026. 4. 1." },
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "687163", poster_path: '/qqGpVVZk2KD1lAvccgTU4Z6nh1H.jpg', writer: "kkt", content: "재밌었어요ㅎㅎ", rating: 5, createdAt: "2026. 4. 1." },
];

const defaultWatchList = [
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', 
    watchList: [ { movieId: "83533", poster_path: '/l18o0AK18KS118tWeROOKYkF0ng.jpg' },
                 { movieId: "1226863", poster_path: '/knaXOBDBecVBWZVup3zXaOoy23v.jpg' },
                 { movieId: "1084242", poster_path: '/ib6v6qUXzez1x2qIOLN7C0yJNPQ.jpg' }, ]}
];

const defaultLists = [
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', 
    title : '재밌는 영화',
    desc : '올해 최고로 재밌는 영화',
    lists: [ { movieId: "1268127", poster_path: '/f7sCSLEPRfV2fWQ0RYOtHhnHXuG.jpg' },
             { movieId: "1297842", poster_path: '/otP94vckeMXAgQxzhcRkZSeSmYv.jpg' },
             { movieId: "1327819", poster_path: '/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg' }, ]},
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', 
    name : '재미없는 영화',
    description : '올해 최고로 재미없는 영화',
    lists: [ { movieId: "1265609", poster_path: '/cfeIYPthWgq5XFZnx7cbpr7xFTp.jpg' },
             { movieId: "1159559", poster_path: '/gqgBqxyr8tGQGJCFrRWAzfA7Cml.jpg' },
             { movieId: "1171145", poster_path: '/77ggpowGO0ORQY9x33NeBIPajm1.jpg' }, ]},
];

const defaultLikes = [
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "687163", poster_path: '/qqGpVVZk2KD1lAvccgTU4Z6nh1H.jpg' },
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "1226863", poster_path: '/knaXOBDBecVBWZVup3zXaOoy23v.jpg' },
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "1327819", poster_path: '/vJu9THzQ26Q5sWOVnhOkuRH5M1P.jpg' },
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "83533", poster_path: '/l18o0AK18KS118tWeROOKYkF0ng.jpg' },
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "1268127", poster_path: '/f7sCSLEPRfV2fWQ0RYOtHhnHXuG.jpg' },
  { uid: 'YwY5UFVvXkXcWWiZu83EoWfl1al1', movieId: "1297842", poster_path: '/otP94vckeMXAgQxzhcRkZSeSmYv.jpg' },
];

const useAppStore = create((set) => ({
  currentUser: null,
  currentUserInfo: null,
  movieReviews: defaultMovieReviews,
  userReviews: null,
  films: defaultFilms,
  watchList: defaultWatchList,
  lists: defaultLists,
  likes: defaultLikes,

  setCurrentUser: (loginUser) => set({ currentUser: loginUser }),
  setCurrentUserInfo: (loginUser) => set({ currentUserInfo: loginUser }),

  searchResults: [], // 검색 결과를 담을 배열
  setSearchResults: (results) => set({ searchResults: results }),

  initApp: () => {
    const auth = getAuth(); //파이어베이스가 초기화된 auth 객체

    // onAuthStateChanged는 인증 상태가 변경될 때마다 실행되는 콜백 함수를 등록함
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) =>{
      if(currentUser){ // 로그인이 되었을 때
        const currentUserInfo = await dbApi.readUserInfo();
        const likeLists = await dbApi.getReviewLikes(currentUser.uid);
        
        set({ 
          currentUser: currentUser,
          currentUserInfo: currentUserInfo,
          likes : likeLists //MyPage -> likes 페이지 좋아요 목록 설정
        });
        console.log("로그인된 유저 : ", currentUser.uid);
      }else { //로그아웃 되었을 때
        set({ 
          currentUser: null,
          currentUserInfo: null,
          
        });
        console.log("로그아웃 상태");
      }
    });

    // 컴포넌트 언마운트 시 옵저버 해제 (메모리 누수 방지)
    return () => unsubscribe();
  },
  login: (email, pwd) => {
    dbApi.authLogin(email, pwd);
    return 1;
  },
  logout: () => {
    const auth = getAuth();
    signOut(auth);
  },
  addReview: (movieReviews) =>{
    dbApi.addDBReview(movieReviews);
    set((state) => ({
      movieReviews: [...state.movieReviews, movieReviews],
  }))},
  getMovieReview : async(movieId) => {
    const movieReviews = await dbApi.getDBMovieReview(movieId);

    set(() => ({
      movieReviews: movieReviews,
    }))
  },
  getUserReview : async(uid) => {
    const userReviews = await dbApi.getDBUserReview(uid);

    set(() => ({
      userReviews: userReviews,
    }))
  },
  addReviewLike : async(reviewLiked,liked,uid,movieId) => {
    await dbApi.addDBReviewLike(reviewLiked,liked,uid,movieId);
  },
  checkReviewLike : async (uid,movieId) => {
    await dbApi.checkDBReviewLike(uid, movieId);
  },
}));

export default useAppStore;
