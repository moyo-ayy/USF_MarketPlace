import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Products from "../components/Products";
import Footer from "../components/Footer";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ChairIcon from "@mui/icons-material/Chair";
import SpeakerIcon from "@mui/icons-material/Speaker";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ReactLoading from 'react-loading';
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  /* margin-top: 50px; */
  height: calc(100vh - 50px);
  font-family: "Playfair", serif;
  justify-content: center;
`;

const Left = styled.div`
  padding: 20px;
  width: 10%;
  background-color: rgb(207, 196, 147);
  min-width: 90px;
  // display: flex;
  // flex-direction:column;
  // align-content: center;
  
`;

const IconsPanel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Right = styled.div`
  flex-grow: 2; /* Allow the scrollable content to grow and fill the remaining space */
  overflow-y: auto; /* Enable vertical scrolling */
  background-color: white;

`;

const Filter = styled.div`
display: flex;
flex-direction:column;
justify-content: center;
margin-bottom: 5px;
`

const Select = styled.select`
  width: 100%;
  padding: 5px 5px 5px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align:center;
  -webkit-appearance: none;
`;

//for spinner
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;



const Home = () => {
  // const user = localStorage.getItem("token");
  const SERVER = process.env.REACT_APP_SERVER;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const [sort,setSort] = useState("");
  const [cat,setCat]=useState("");

  const [searchTerm,setSearchterm] = useState(""); //for search bar

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_SERVER}api/items/?min=${minRef.current.value}&max=${maxRef.current.value}&cat=${cat}&sort=${sort}`
        )
        .then((response) => {
          setList(response.data);
          setLoading(false);
        })
        .catch((error) => setError(error.message));
    };

    fetchdata();
  }, [cat,sort,SERVER]);

  const HandleClickClothes = () => {
    minRef.current.value=null;      //to reset the min max and not sort with both query
    maxRef.current.value=null;
    setCat("Clothing")
  };

  const HandleClickFur = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("Furniture");
  };

  const HandleClickE = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("Electronics");
  };

  const HandleClickMis = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("Miscellaneous"); //could be spelt wrong
  };
  const HandleClickRestart = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("");
    
  };




  const HandleFilter = async()=>{
     setLoading(true);
     setCat("")
     await axios
       .get(
         `${SERVER}api/items/?min=${minRef.current.value}&max=${maxRef.current.value}&cat=${cat}&sort=${sort}`
       )
       .then((response) => {
         setList(response.data);
         setLoading(false);
       });
  }

    const HandleSelect = (event) => {
      const { value } = event.target;
      setSort(value)
    };


  const filteredList = list?.filter((ele) =>
    ele.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );


  return (
    <div>
      
      <Navbar term={searchTerm} setTerm={setSearchterm} />
      <Wrapper>
        <Left>
          <Filter>
            <span
              style={{
                marginBottom: "10px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Price
            </span>
            <div style={{
              display:"flex",
              justifyContent:"space-around",
              alignContent: "center",
              }}>
            <input
              style={{ 
                padding: "5px", 
                marginBottom: "5px",
                width:"50%",
                borderWidth:"0.5px",
                borderRadius:"4px",
                boxSizing:"border-box",
              }}
              ref={minRef}
              type="number"
              placeholder="min"
            />
            {/* <p style={{fontWeight: "bold",}}> to </p> */}
            <input
              style={{
                padding: "5px", 
                marginBottom: "5px",
                width:"50%", 
                borderWidth:"0.5px",
                borderRadius:"4px",
                boxSizing:"border-box"
              }}
              ref={maxRef}
              type="number"
              placeholder="max"
            />
            </div>
            <button onClick={HandleFilter} style={{
               padding: "5px",
               backgroundColor: "white",
               border: "none",
               borderRadius: "4px",
               }}>
              Apply
            </button>
          </Filter>
          <Select name="category" onChange={HandleSelect} required>
            <option value="">Sort</option>
            <option value="pricel">Price: Low to High</option>
            <option value="priceh">Price: High to Low</option>
            <option value="createdAt">Latest Posting</option>
          </Select>
          <IconsPanel>
            <RestartAltIcon
              fontSize="large"
              category="Miscellaneous"
              onClick={HandleClickRestart}
              style={{ marginBottom: "60px", marginTop: "50px" }}
            ></RestartAltIcon>
            <CheckroomIcon
              fontSize="large"
              category="Clothing"
              onClick={HandleClickClothes}
              value="Clothing"
              style={{ marginBottom: "60px" }}
            ></CheckroomIcon>
            <ChairIcon
              fontSize="large"
              category="Furniture"
              onClick={HandleClickFur}
              value="Furniture"
              style={{ marginBottom: "60px" }}
            ></ChairIcon>
            <SpeakerIcon
              fontSize="large"
              category="Electronics"
              onClick={HandleClickE}
              style={{ marginBottom: "60px" }}
            ></SpeakerIcon>
            <MoreHorizIcon
              fontSize="large"
              onClick={HandleClickMis}
              style={{ marginBottom: "60px" }}
            ></MoreHorizIcon>
          </IconsPanel>
        </Left>
        <Right>
          {error ? (
            error
          ) : loading ? (
            <LoadingWrapper>
              <ReactLoading
                type={"spin"}
                color={"blue"}
                height={100}
                width={100}
              />
            </LoadingWrapper>
          ) : (
            <Products list={filteredList}></Products>
          )}
        </Right>
      </Wrapper>
      <Footer></Footer>
    </div>
  );
};

export default Home;
