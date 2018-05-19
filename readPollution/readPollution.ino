#include <ArduinoJson.h>
#include <SDS011.h>
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#define FIREBASE_HOST "kmutnb-aqi.firebaseio.com"
#define FIREBASE_AUTH "27PbUSr9uKo9zrT9Uk4FePSVokrW1cWQUgvqbDMq"
#define WIFI_SSID "ESL_Lab_2.4GHz"
#define WIFI_PASSWORD "wifi@esl"
const String USER = "champ2002";
const float concentrationBoundariesP25[7][2] =
{
        {0.0f,12.0f},
        {12.1f,35.4f},
        {35.5f,55.4f},
        {55.5f,150.4f},
        {150.5f,250.4f},
        {250.5f,350.4f},
        {350.5f,500.4f}
};
const unsigned int indexBoundaries[7][2] =
{
        {0,50},
        {51,100},
        {101,150},
        {151,200},
        {201,300},
        {301,400},
        {401,500}
};

float p10, p25;
int error;
int aqi25, aqi10;
SDS011 my_sds;
const int RED = D6;
const int GREEN = D7;
const int BLUE = D8;

void setup() {
  my_sds.begin(D1, D2); //RX, TX
  Serial.begin(9600);
  pinMode(RED, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(BLUE, OUTPUT);
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
  String ID = Firebase.getString("User/"+ USER + "/DeviceID/Name");
  if(ID != ""){
    Serial.print("Device ID : ");
    Serial.println(ID);
    analogWrite(RED, 0);
    analogWrite(GREEN, 255);
    analogWrite(BLUE, 0);
    error = my_sds.read(&p25, &p10);
    if (!error) {
      Serial.println("P2.5: " + String(p25));
      aqi25 = calculateAirQualityIndex(p25, concentrationBoundariesP25);
      Serial.println("AQI2.5 " + String(aqi25));
      Serial.println(" ");
    }
    pushAQI(aqi25);  
  } else {
    Serial.println("DeviceID Not Found!");
    analogWrite(RED, 255);
    analogWrite(GREEN, 00);
    analogWrite(BLUE, 0);  
    delay (1000);
    analogWrite(RED, 0);
    analogWrite(GREEN, 0);
    analogWrite(BLUE, 0); 
    delay (1000);
  }
  delay(4000);
}
void pushAQI(int aqicalculated){
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& aqiObject = jsonBuffer.createObject();
  JsonObject& aqiTime = aqiObject.createNestedObject("timestamp");
  aqiObject["value"] = aqicalculated;
  aqiTime[".sv"] = "timestamp";
  Firebase.push("User/"+ USER + "/DeviceID/AQI", aqiObject);
  // handle error
  if (Firebase.failed()) {
      Serial.print("pushing /aqi failed:");
      Serial.println(Firebase.error());
      return;
  }
}
int calculateAirQualityIndex(float pm, const float concentrationBoundaries[7][2])
{
    int iLow, iHigh, ii;
    float cLow, cHigh;

    cLow = 0;
    cHigh = 0;
    iHigh = 0;
    iLow = 0;

    /* Finding out the boundary values and calculating the PM2.5 based off
        that */
    for(ii=0;ii<7;ii++)
    {
        if (concentrationBoundaries[ii][0] <= pm
                && concentrationBoundaries[ii][1] >= pm)
        {
            cLow = concentrationBoundaries[ii][0];
            cHigh = concentrationBoundaries[ii][1];
            iLow = indexBoundaries[ii][0];
            iHigh = indexBoundaries[ii][1];
            break;
        }
    }
        
    return (int)(((iHigh - iLow)/(cHigh - cLow)) * (pm - cLow)) + iLow;
}
