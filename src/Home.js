import {
  AuthCheck,
  useAuth,
  useFirestoreCollection,
  useFirestore,
} from "reactfire";
import React, { Suspense } from "react";
import "./App.css";

function Home() {
  const auth = useAuth();
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

  return (
    <div style={{ padding: 20 }}>
      <h1>{auth.currentUser.email}</h1>
      <button onClick={async () => await auth.signOut()} style={{ margin: 12 }}>
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
              <button onClick={()=> doDeleteItem(d.id)}>DELETE</button>
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
