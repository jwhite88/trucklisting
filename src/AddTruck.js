import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export const Wrapper = styled.div`
  border: solid black 10px;
  margin: 5px;
  padding: 5px;
  background: white;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-right: 10px;
`;

const Button = styled.button`
  border: solid;
  margin: 15px;
  padding: 5px;
  background: blue;
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background: blue;
    transform: scale(1.1);
  }

  &:active {
    background: darkblue;
  }
`;

const P = styled.p`
  font-weight: bold;
`;

const InputWrapper = styled.div`
  border: solid;
  margin: 5px;
  padding: 5px;
  background: lightblue;
`;

const InStock = ({ truckList, setTruckList }) => {
  const remove = (index) => {
    const updatedList = [...truckList];
    updatedList.splice(index, 1);
    setTruckList(updatedList);
  };

  return (
    <>
      {truckList.map((truck, index) => (
        <Wrapper key={index}>
          <div>
            <Image src={require(`../public/image/${truck.image}`)} />

            <div>
              <P>${truck.cost}</P>
              <P>{truck.make}</P>
              <P>{truck.model}</P>
              <P>{truck.description}</P>
            </div>
          </div>
          <button onClick={() => remove(index)}>Remove</button>
        </Wrapper>
      ))}
    </>
  );
};

const AddTruck = () => {
  const [cost, setPrice] = useState(0);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [body, setBody] = useState("");
  const [year, setYear] = useState(0);
  const [truckList, setTruckList] = useState([]);

  const handleAddTruck = async () => {
    const newTruck = {
      cost,
      make,
      model,
      body: body.toLowerCase(),
      description,
      image,
      year,
    };

    const formData = new FormData();
    formData.append("cost", cost);
    formData.append("make", make.toUpperCase());
    formData.append("model", model.toUpperCase());
    formData.append("description", description);
    formData.append("body", body.toLowerCase());
    formData.append("year", year);
    // formData.append("image", image);
    // Append each image file individually
    if (image) {
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
    }
    formData.append("image", image);

    const response = await fetch("/truck", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        authorization: `Bearer ${localStorage.getItem("jsonwebtoken")}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      // setTruckList([...truckList, data]);
      // setTruckList((prev) => [...truckList, data])
      setPrice("");
      setMake("");
      setModel("");
      setBody("");
      setYear(0);
      setDescription("");
      setImage("");
      window.alert("Truck added successfully!");
    } else {
      window.alert("Something went wrong");

      // Handle error response
      throw new Error("Failed to add truck");
    }
  };

  const handleFile = (e) => {
     setImage(e.target.files)
  }

  return (
    <>
      <InputWrapper>
        <div>
          <P>Price</P>
          <input
            type="number"
            value={cost}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
          />
        </div>
        <div>
          <P>Make</P>
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="Enter Info"
          />
        </div>
        <div>
          <P>Model</P>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter Info"
          />
        </div>
        <div>
          <div>
            <P>Year</P>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter Info"
            />
          </div>

          <P>Body</P>
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter Info"
          />
        </div>
        <div>
          <P>Description</P>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Info"
          />
        </div>
        <div>
          <P>Image</P>
          <input
            type="file"
            multiple
            onChange={handleFile}
            placeholder="Enter Image URL"
          />
        </div>
      </InputWrapper>
      <Button onClick={handleAddTruck}>Add Truck</Button>
      <InStock truckList={truckList} setTruckList={setTruckList} />
    </>
  );
};

export default AddTruck;
