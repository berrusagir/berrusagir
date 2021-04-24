import React from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { getLocations, getTrips } from "./../../Helpers/FirebaseManagement";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const GOOGLE_MAPS_APIKEY = "AIzaSyCSZ1ISydjctq_6wHHrXRsA3BMPywf8W6Y";

/*getData() 
{
  Geocoder.init(GOOGLE_MAPS_APIKEY);//3.soru için geocoding apisinin veri çekeceği api key fonksiyonu tanımladık
  Geocoder.getFromLocation("London").then(
    json => {
      var location = json.result[0].geometry.location;
      alert(location.lat + ", " + location.lng);
    },
    error => {
      alert(error);

    }
    )
}*/

const centered = {
  justifyContent: "center",
  alignItems: "center",
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  maps: {
    ...StyleSheet.absoluteFillObject,
  },
});

class HomeScreen extends React.Component {
  state = {
    sorgu1: [],
    sorgu2: [],
    sorgu1Goster: false,
    sorgu2Goster: false,
    startDate: null,
    endDate: null,
    startDate2: null,
    endDate2: null,
    locations: [],
  };

  sorgu1 = (trips) => {
    this.mergeDates(trips);
  };
  sorgu2 = (trips) => {
    this.setState({
      sorgu2: trips,
    });
  };

  mergeDates = (data) => {
    let dates = [];
    data.forEach((element) => {
      const pickUpDate = element.pickupDateTme.split(" ")[0];
      const passengerCount = element.passengerCount;
      dates.push({
        pickUpDate,
        passengerCount,
      });
    });
    let sum = [];
    dates.forEach((element) => {
      const index = sum.findIndex((x) => x.pickUpDate == element.pickUpDate);
      if (index > -1) {
        sum[index].passengerCount =
          sum[index].passengerCount + element.passengerCount;
      } else {
        sum.push({
          pickUpDate: element.pickUpDate,
          passengerCount: element.passengerCount,
        });
      }
    });
    this.setState({ sorgu1: sum });
  };

  componentDidMount() {
    getTrips().then((trips) => {
      this.sorgu1(trips);
      this.sorgu2(trips);
    });

    getLocations().then((locations) => {
      this.setState({ locations });
    });
  }

  timestamp = (date) => {
    const d = new Date(date);
    return d.getTime();
  };

  render() {
    const {
      sorgu1,
      sorgu2,
      sorgu3,
      sorgu1Goster,
      sorgu2Goster,
      sorgu3Goster,
      location,
      locations,
    } = this.state;
    const divider = <View style={{ width: "100%", height: 10 }}></View>;
    console.log(this.state.location);
    return (
      <SafeAreaView
        style={{ flex: 1, width: "100%", backgroundColor: "#f5fffae" }}
      >
        <ScrollView
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#ffffe0",
          }}
          contentContainerStyle={{
            ...centered,
            height: "auto",
            paddingBottom: 150,
          }}
        >
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#66cdaa",
              alignItems: "flex-start",
              justifyContent: "space-around",
              paddingHorizontal: 12,
            }}
          >
            <View style={{ width: "100%", ...centered }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {" "}
                Yaz Lab - 2 / Proje - 2
              </Text>
            </View>
            <View style={{ width: "100%", ...centered }}>
              <Text style={{ fontSize: 12 }}>Berru SAĞIR & Anıl ÖZBÖRME</Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "#ffffe0",
              alignItems: "flex-start",
              justifyContent: "space-around",
              paddingHorizontal: 12,
            }}
          >
            <View style={{ width: "100%" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Tip 1 - Sorgu 1
              </Text>
            </View>
            {divider}
            <View style={{ width: "100%" }}>
              <Text style={{ fontSize: 16 }}>
                En fazla yolcu taşınan 5 günü ve toplam yolcu sayılarını
                listeleyiniz.{" "}
              </Text>
            </View>
            {divider}
            {sorgu1Goster && (
              <View style={{ width: "100%" }}>
                {sorgu1?.length > 0 &&
                  sorgu1
                    .sort((x, y) => {
                      return y.passengerCount - x.passengerCount;
                    })
                    .slice(0, 5)
                    .map((item, key) => {
                      return (
                        <View
                          key={key}
                          style={{
                            width: "100%",
                            backgroundColor: key % 2 ? "#ffffe0" : "#66cdaa",
                            flexDirection: "row",
                            ...centered,
                            justifyContent: "space-around",
                            height: 30,
                          }}
                        >
                          <View style={{ width: "50%" }}>
                            <Text>{item.pickUpDate}</Text>
                          </View>
                          <View style={{ width: "50%" }}>
                            <Text>{item.passengerCount}</Text>
                          </View>
                        </View>
                      );
                    })}
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                this.setState((prevState) => ({
                  sorgu1Goster: !prevState.sorgu1Goster,
                }));
              }}
              style={{
                width: "100%",
                backgroundColor: "#66cdaa",
                width: 100,
                height: 20,
                borderRadius: 4,
                ...centered,
                marginVertical: 6,
              }}
            >
              <Text style={{ fontSize: 14 }}>
                {sorgu1Goster ? "Gizle" : "Sorgu Sonucu"}
              </Text>
            </TouchableOpacity>
            {divider}
          </View>

          <View
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "#66cdaa",
              alignItems: "flex-start",
              justifyContent: "space-around",
              paddingHorizontal: 12,
            }}
          >
            <View style={{ width: "100%" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Tip 2 - Sorgu 1
              </Text>
            </View>
            {divider}
            <View style={{ width: "100%" }}>
              <Text style={{ fontSize: 16 }}>
                İki tarih arasında seyahat edilen en çok mesafeli 5 yolculuk
                hangisidir?{" "}
              </Text>
            </View>
            {divider}
            <View
              style={{
                width: "100%",
                height: 50,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <TextInput
                style={{
                  backgroundColor: "#ffffe0",
                  width: "48%",
                  borderRadius: 12,
                }}
                placeholder="Başlangıç günü"
                onChangeText={(startDate) => this.setState({ startDate })}
              />
              <TextInput
                style={{
                  backgroundColor: "#ffffe0",
                  width: "48%",
                  borderRadius: 12,
                }}
                placeholder="Bitiş günü"
                onChangeText={(endDate) => this.setState({ endDate })}
              />
            </View>
            {sorgu2Goster && (
              <View style={{ width: "100%" }}>
                {sorgu2?.length > 0 &&
                  sorgu2
                    .filter((item) => {
                      let day = item.pickupDateTme.split("-")[2];
                      day = parseInt(day);
                      return (
                        parseInt(this.state.startDate) <= day &&
                        day <= parseInt(this.state.endDate)
                      );
                    })
                    .sort((x, y) => {
                      return y.tripDistance - x.tripDistance;
                    })
                    .slice(0, 5)
                    .map((item, key) => {
                      return (
                        <View
                          key={key}
                          style={{
                            width: "100%",
                            backgroundColor: key % 2 ? "#66cdaa" : "#ffffe0",
                            flexDirection: "row",
                            ...centered,
                            justifyContent: "space-around",
                            height: 30,
                          }}
                        >
                          <View style={{ width: "50%" }}>
                            <Text>{item.pickupDateTme.split(" ")[0]}</Text>
                          </View>
                          <View style={{ width: "50%" }}>
                            <Text>{item.tripDistance}</Text>
                          </View>
                        </View>
                      );
                    })}
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                this.setState((prevState) => ({
                  sorgu2Goster: !prevState.sorgu2Goster,
                }));
              }}
              style={{
                width: "100%",
                backgroundColor: "#ffffe0",
                width: 100,
                height: 20,
                borderRadius: 4,
                ...centered,
                marginVertical: 6,
              }}
            >
              <Text style={{ fontSize: 14 }}>
                {sorgu2Goster ? "Gizle" : "Sorgu Sonucu"}
              </Text>
            </TouchableOpacity>
            {divider}
          </View>

          {
            <View
              style={{
                width: "100%",
                height: "auto",
                backgroundColor: "#ffffe0",
                alignItems: "flex-start",
                justifyContent: "space-around",
                paddingHorizontal: 12,
                marginTop: 12,
              }}
            >
              <View style={{ width: "100%" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Tip 3 - Sorgu 1
                </Text>
              </View>
              {divider}
              <View style={{ width: "100%" }}>
                <Text style={{ fontSize: 16 }}>
                  Belirli bir günde en uzun seyahatin harita üstünde yolunu
                  çizin.{" "}
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <TextInput
                  style={{
                    backgroundColor: "#66cdaa",
                    width: "48%",
                    borderRadius: 12,
                  }}
                  placeholder="Gün Yazın"
                  onChangeText={(selectedDay) => this.setState({ selectedDay })}
                />
              </View>

              {divider}

              <TouchableOpacity
                onPress={() => {
                  this.setState((prevState) => ({
                    sorgu3Goster: !prevState.sorgu3Goster,
                  }));
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#66cdaa",
                  width: 100,
                  height: 20,
                  borderRadius: 4,
                  ...centered,
                  marginVertical: 6,
                }}
              >
                <Text style={{ fontSize: 14 }}>
                  {sorgu3Goster ? "Temizle" : "Haritada Göster"}
                </Text>
              </TouchableOpacity>
              {divider}

              <View
                style={{
                  backgroundColor: "#66cdaa",
                  width: "100%",
                  height: 150,
                }}
              >
                <View style={styles.container}>
                  <MapView
                    style={styles.maps}
                    initialRegion={{
                      latitude: 41.2676472042078761,
                      longitude: 31.453325529894464,
                      latitudeDelta: 2,
                      longitudeDelta: 4,
                    }}
                  >
                    <MapViewDirections
                      origin={{
                        latitude: 41.2676472042078761,
                        longitude: 31.453325529894464,
                      }}
                      destination={{
                        latitude: 40.82094299993544,
                        longitude: 29.923747542373867,
                      }}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={4}
                      strokeColor="red"
                    />
                    <Marker
                      coordinate={{
                        latitude: 41.2676472042078761,
                        longitude: 31.453325529894464,
                      }}
                    />
                    <Marker
                      coordinate={{
                        latitude: 40.82094299993544,
                        longitude: 29.923747542373867,
                      }}
                    />
                  </MapView>
                </View>
              </View>
            </View>
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
