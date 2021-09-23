const express = require("express");
const axios = require("axios");
const ejs = require("ejs");
const app = express();

app.use(express.static("public"));
app.set("view engine", ejs);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("country.ejs", { countryData: "" });
});

app.post("/countries", (req, res) => {
  let url;
  let userCountry = req.body.country;
  if (userCountry === "Estonia") {
    url = "https://restcountries.com/v2/name/estonia?fullText=true";
  } else if (userCountry === "Latvia") {
    url = "https://restcountries.com/v2/name/latvia?fullText=true";
  } else {
    url = "https://restcountries.com/v2/name/lithuania?fullText=true";
  }
  console.log(url);
  axios
    .get(url)
    .then((response) => {

      let countryData = {
        countryName: response.data[0].name,
        countryTopLevelDomain: response.data[0].topLevelDomain,
        countryCallingCode: response.data[0].callingCodes,
        countryCapital: response.data[0].capital,
        countryRegion: response.data[0].continent,
        countrySubRegion: response.data[0].region,
        countryPopulation: response.data[0].population,
        countryTimezone: response.data[0].timezones,
        countryLanguageInEnglish: response.data[0].languages[0].name,
        countryCurrencyCode: response.data[0].currencies[0].code,
        countryCurrencyName: response.data[0].currencies[0].name,
        countryCurrencySymbol: response.data[0].currencies[0].symbol,
        countryFlagUrl: response.data[0].flags[1],
      };
      console.log(countryData);
      res.render("country.ejs", { countryData: countryData });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});