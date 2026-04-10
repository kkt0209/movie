import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";

const dbApi = {

    authSignup : async (user) => {
        try{
            await createUserWithEmailAndPassword(auth, user.email, user.pwd);
            const newUser = {
                    email: user.email,
                    name: user.name, 
                    birth: user.birth,
                    phone: user.phone
                }
            //회원가입 한 정보를 기반으로 uid로 문서를 만든후 user정보를 삽입함.
            await setDoc(doc(db, "users", auth.currentUser.uid), newUser);

            return 1;
        }catch(e){
            //회원가입시 발생하는 오류 코드
            // auth/email-already-in-use : 입력한 이메일 주소를 가진 계정이 이미 존재하는 경우.
            // auth/invalid-email : 이메일 주소가 유효하지 않는 경우.
            // auth/operation-not-allowed : 이메일/비밀번호 계정이 활성화되지 않은 경우. 인증 탭 아래의 firebase 콘솔에서 이메일/비밀번호 계정을 활성화.
            // auth/weak-password : 약한 비밀번호, 암호가 충부니 강력하지 않은 경우
            alert(e);
        }
    },

    authLogin : async (email, password) => {
        try{
            await signInWithEmailAndPassword(auth, email, password);

            // alert("로그인 성공!");
        }catch(e){
            // 로그인시 발생하는 오류 코드
            // auth/invalid-email : 이메일 주소가 유효하지 않은 경우.
            // auth/user-disabled : 지정된 이메일에 해당하는 사용자가 비활성화 된 경우.
            // auth/user-not-found : 주어진 이메일에 해당하는 사용자가 없는 경우.
            // auth/wrong-password : 주어진 이메일의 비밀번호가 유효하지 않거나 이메일에 해당하는 계정에 비밀번호가 설정되어 있지 않은 경우.
            alert(e);
        }
    },

    readUserInfo: async (uid) => {
        if (!uid) return null; // uid가 없으면 바로 리턴
        const userDocRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userDocRef);
        return userSnapshot.data();
    },
    updateUserInfo: async (uid, userInfo) => {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, userInfo);
    },

    // Film
    addUserFilm : async(toggle, newFilm) => {
        const docRef = doc(db, "films", `${newFilm.uid}_${newFilm.movieId}`);
        
        if (toggle) {
            await deleteDoc(docRef); // 취소
            return false;
        } else {
            await setDoc(docRef, newFilm);
            return true;
        }
    },
    getUserFilm : async(uid) => {
        const q = query(
            collection(db, "films"),
            where("uid", "==", uid)
        );

        const userFilm = await getDocs(q);

        const docItems = Array();

        userFilm.docs.map(doc => docItems.push(doc.data()));

        return docItems;
    },

    // Review
    addDBReview : async(newReview) =>{
        const reviewRef = collection(db, "reviews");

        await addDoc(reviewRef , newReview);
    },
    getDBMovieReview : async(movieId) => {
        const id = String(movieId);
        const q = query(
            collection(db, "reviews"),
            where("movieId", "==", id),
            orderBy("id","desc")
        );

        const reviewList = await getDocs(q);

        return reviewList.docs.map(doc => doc.data());
    },
    getDBUserReview : async(uid) => {
            const q = query(
            collection(db, "reviews"),
            where("uid", "==", uid),
            orderBy("id","desc")
        );

        const reviewList = await getDocs(q);

        const docItems = Array();

        reviewList.docs.map(doc => docItems.push(doc.data()));

        return docItems;
    },
    addDBReviewLike : async(reviewLiked,liked,uid,movieId) => {
        const docRef = doc(db, "likes", `${uid}_${movieId}`);
        
        if (reviewLiked) {
            await deleteDoc(docRef); // 취소
            return false;
        } else {
            await setDoc(docRef, liked);
            return true;
        }
    },
    getReviewLikes : async(uid) => {
        const q = query(
            collection(db, "likes"),
            where("uid", "==", uid)
        );
        const likeList = await getDocs(q);

        const lists = likeList.docs.map(doc => doc.data());
    
        return lists;
    },
    checkDBReviewLike : async(uid, movieId) => {
        const docId = `${uid}_${movieId}`;
        const likeRef = doc(db, "likes", docId);

        const snap = await getDoc(likeRef);

        return snap.exists();
    },

    // WatchList
    addDBWatchList : async(watch) =>{
        const listRef = collection(db, "watchlist");
        
        await addDoc(listRef , watch);
    },
    getDBWatchLists: async(uid) => {
        const q = query(
            collection(db, "watchlist"),
            where("uid", "==", uid),
        );

        const watchlists = await getDocs(q);

        const docItems = Array();

        watchlists.docs.map(doc => docItems.push(doc.data()));

        return docItems;
    },

    // Lists
    addDBList : async(newList) =>{
        const listRef = collection(db, "lists");
        
        await addDoc(listRef , newList);
    },
    getDBUserLists: async(uid) => {
        const q = query(
            collection(db, "lists"),
            where("uid", "==", uid),
        );

        const lists = await getDocs(q);

        const docItems = Array();

        lists.docs.map(doc => docItems.push(doc.data()));

        return docItems;
    },
    getDBAllLists: async() => {
        const q = query(
            collection(db, "lists")
        );

        const lists = await getDocs(q);

        const docItems = Array();

        lists.docs.map(doc => docItems.push(doc.data()));

        return docItems;
    },

    // Likes
    addDBLikes : async(newLike) =>{
        const listRef = collection(db, "likes");
        
        await addDoc(listRef , newLike);
    },
    getDBLikes: async(uid) => {
        const q = query(
            collection(db, "likes"),
            where("uid", "==", uid),
        );

        const likes = await getDocs(q);

        const docItems = Array();

        likes.docs.map(doc => docItems.push(doc.data()));

        return docItems;
    },

    checkToggleFilm : async(uid, movieId) =>{
        const docId = `${uid}_${movieId}`;
        const ref = doc(db, "films", docId);

        const snap = await getDoc(ref);

        return snap.exists();
    },
}

export default dbApi;