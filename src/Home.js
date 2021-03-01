import { useFirestoreCollection, useFirestore } from "reactfire";
import React from "react";
import "./App.css";

// redux
import { useSelector, useDispatch } from "react-redux";
import { logOut, selectUser } from "./features/userAuth/userAuthSlice";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const itemsRef = useFirestore().collection("items");
  const { data, status } = useFirestoreCollection(itemsRef);

  /**
   *
   */
  const doAddItem = async () => {
    try {
      await itemsRef.doc().set({ name: new Date().getTime() + "-NAME" });
    } catch (e) {
      alert("Error " + e.message);
    }
  };

  const doDeleteItem = async (id) => {
    try {
      await itemsRef.doc(id).delete();
    } catch (e) {
      alert("Error " + e.message);
    }
  };

  const doLogout = async () => {
    await dispatch(logOut());
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{user?.email}</h1>
      <button onClick={async () => await doLogout()} style={{ margin: 12 }}>
        LOGOUT
      </button>
      <div>
        <button onClick={async () => doAddItem()} style={{ margin: 12 }}>
          ADD ITEMS
        </button>
        <div>
          {status === "loading" ? <div>IS LOADING</div> : null}
          {data?.docs?.map((d) => (
            <p key={d.id}>
              <button onClick={() => doDeleteItem(d.id)}>DELETE</button>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <span>
                {d.id} {d.data().name}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
