import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";

const authSignup = async (user) => {
    try{
        await createUserWithEmailAndPassword(auth, user.email, user.pwd);
        const newUser = {
                name: user.name, 
                birth: user.birth,
                phone: user.phone
            }
        //회원가입 한 정보를 기반으로 uid로 문서를 만든후 user정보를 삽입함.
        await setDoc(doc(db, "users", auth.currentUser.uid), newUser);

        alert("회원가입 완료");
        return 1;
    }catch(e){
        //회원가입시 발생하는 오류 코드
        // auth/email-already-in-use : 입력한 이메일 주소를 가진 계정이 이미 존재하는 경우.
        // auth/invalid-email : 이메일 주소가 유효하지 않는 경우.
        // auth/operation-not-allowed : 이메일/비밀번호 계정이 활성화되지 않은 경우. 인증 탭 아래의 firebase 콘솔에서 이메일/비밀번호 계정을 활성화.
        // auth/weak-password : 약한 비밀번호, 암호가 충부니 강력하지 않은 경우
        alert(e);
    }
};

const authLogin = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);

        alert("로그인 성공!");
    }catch(e){
        // 로그인시 발생하는 오류 코드
        // auth/invalid-email : 이메일 주소가 유효하지 않은 경우.
        // auth/user-disabled : 지정된 이메일에 해당하는 사용자가 비활성화 된 경우.
        // auth/user-not-found : 주어진 이메일에 해당하는 사용자가 없는 경우.
        // auth/wrong-password : 주어진 이메일의 비밀번호가 유효하지 않거나 이메일에 해당하는 계정에 비밀번호가 설정되어 있지 않은 경우.
        alert(e);
    }
}

const readUserInfo = async() =>{
    const userDocRef = doc(db, "users", auth.currentUser.uid);
	const userSnapshot = await getDoc(userDocRef);

    return userSnapshot.data();
}

const addDBReview = async(newReview) =>{
    const reviewRef = collection(db, "reviews");

    await addDoc(reviewRef , newReview);
}

const getDBReview = async(movieId) => {
    movieId = String(movieId);
    const q = query(
        collection(db, "reviews"),
        where("movieId", "==", movieId)
    );

    const reviewList = await getDocs(q);

    const docItems = Array();

    reviewList.docs.map(doc => docItems.push(doc.data()));

    return docItems;
}


export { authLogin, authSignup, readUserInfo ,addDBReview , getDBReview};
