import React, { useState, useEffect } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";

export default function TruckList() {
  const [searchValues, setSearchValues] = useState({
    make: "",
    model: "",
    startYear: "",
    endYear: "",
    body: "",
    cost: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    fetch("/truck")
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        setSearchResults(results);
      });
  }, []);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setSearchValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearchClick = () => {
    let theMake = [];
    let theModel = [];
    let theBody = [];
    let theYear = [];
    let theCost = [];

    if (searchValues.make) {
      theMake = searchResults.filter(
        (item) => item.make.toUpperCase() === searchValues.make.toUpperCase()
      );
    }

    if (searchValues.model) {
      theModel = searchResults.filter(
        (item) => item.model.toUpperCase() === searchValues.model.toUpperCase()
      );
    }

    if (searchValues.body) {
      theBody = searchResults.filter(
        (item) => item.body.toUpperCase() === searchValues.body.toUpperCase()
      );
    }

    if (searchValues.startYear && searchValues.endYear) {
      theYear = searchResults.filter(
        (item) =>
          item.year >= parseInt(searchValues.startYear) &&
          item.year <= parseInt(searchValues.endYear)
      );
    }

    if (searchValues.startCost && searchValues.endCost) {
      theCost = searchResults.filter(
        (item) =>
          item.cost >= parseInt(searchValues.startCost) &&
          item.cost <= parseInt(searchValues.endCost)
      );
    }

    const results = [
      ...theMake,
      ...theModel,
      ...theBody,
      ...theYear,
      ...theCost,
    ];
    setSearchResults(results);
  };

  return (
    <>
      <div style={{ border: "solid black" }}>
        <h2>Search Truck List</h2>
        <h4>
          Make
          <input
            type="text"
            name="make"
            value={searchValues.make}
            onChange={handleInputChange}
          />
        </h4>
        <h4>
          Model
          <input
            type="text"
            name="model"
            value={searchValues.model}
            onChange={handleInputChange}
          />
        </h4>
        <h4>
          Year Range
          <input
            type="number"
            name="startYear"
            value={searchValues.startYear}
            onChange={handleInputChange}
          />{" "}
          -{" "}
          <input
            type="number"
            name="endYear"
            value={searchValues.endYear}
            onChange={handleInputChange}
          />
        </h4>
        <h4>
          Price Range
          <input
            type="number"
            name="startCost"
            value={searchValues.startCost}
            onChange={handleInputChange}
          />{" "}
          -{" "}
          <input
            type="number"
            name="endCost"
            value={searchValues.endCost}
            onChange={handleInputChange}
          />
        </h4>

        <h4>
          Body
          <input
            type="text"
            name="body"
            value={searchValues.body}
            onChange={handleInputChange}
          />
        </h4>
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div>
        {/* {filteredTrucksList(trucksList).map((item, index) => (
          <div key={index}>
            <p>{item.make} {item.model} {item.year} {item.body}</p>
          </div>
        ))} */}
        {searchResults.length > 0 &&
          searchResults.map((item, index) => (
            <div key={item._id}>
              <p>
                {item.make} {item.model} {item.year} {item.cost} {item.body}{" "}
                {item.description}
                <img style={{ width: "50%" }} src={item.url} alt={item.image} />
              </p>
            </div>
          ))}
      </div>
    </>
  );
}
