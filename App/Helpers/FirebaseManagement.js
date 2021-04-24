import firestore from "@react-native-firebase/firestore";

export const getTrips = () => {
  const db = firestore();
  return db
    .collection("trips")
    .get()
    .then((querySnapshot) => {
      const item = querySnapshot.docs.map((item) => {
        return item.data();
      });
      return item;
    });
};

export const getLocations = () => {
  const db = firestore();
  return db
    .collection("locations")
    .get()
    .then((querySnapshot) => {
      const item = querySnapshot.docs.map((item) => {
        return item.data();
      });
      return item;
    });
};
