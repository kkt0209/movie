import { create } from "zustand";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { handleLogin, readUserInfo } from "db/DB";

const defaultMovieReviews = [
  { id: 1, movieId: "1523145", writer: "test", content: "리뷰1", rating: 5, createdAt: "2026. 4. 1." },
  { id: 2, movieId: "1523145", writer: "kkt", content: "리뷰2", rating: 1, createdAt: "2026. 4. 1." },
];

const useAppStore = create((set) => ({
  currentUser: null,
  currentUserInfo: null,
  reviews: defaultMovieReviews,

  setCurrentUser: (loginUser) => set({ currentUser: loginUser }),
  setCurrentUserInfo: (loginUser) => set({ currentUserInfo: loginUser }),

  initApp: () => {
    const auth = getAuth(); //파이어베이스가 초기화된 auth 객체

    // onAuthStateChanged는 인증 상태가 변경될 때마다 실행되는 콜백 함수를 등록함
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) =>{
      if(currentUser){ // 로그인이 되었을 때
        const currentUserInfo = await readUserInfo();
        set({ 
          currentUser: currentUser,
          currentUserInfo: currentUserInfo,
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
    handleLogin(email, pwd);
    return 1;
  },
  logout: () => {
    const auth = getAuth();
    signOut(auth);
  },
  addReview: (review) =>
    set((state) => ({
      reviews: [...state.reviews, review],
  })),

}));

export default useAppStore;
