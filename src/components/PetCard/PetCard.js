import React from "react";
import pet from "./pet.png";
import "./PetCard.css";
import { storage } from "../../storage/PomPomStorage";
import { useStore } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getBreed } from "../../API/dogapi";
import { getImage } from "../../API/dogapi";
import broken from "./broken.png"
import { getRandomDog } from "../../API/dogapi";
import { breedData } from "../../API/dogapi";

function PetCard(props) {
    const [address, setAddress] = useState(broken)

    const [breed, setBreed] = useState("all")
    const [age, setAge] = useState("4 месяца")
    const [name,setName]=useState("")
    const [cost,setCost]=useState("")

    const currentSizeFilter = useSelector(filterState => filterState.size)
    const currentFurLengthFilter = useSelector(filterState => filterState.furLength)
    const currentBreedFilter = useSelector(filterState => filterState.breed)

    //console.log()

    useEffect(() => {
        getRandomDog(currentBreedFilter, currentSizeFilter, currentFurLengthFilter)
        .then(
            (data) => {

                setBreed(data.breed)
                setAddress(data.url)
                setAge("4 месяца")
                setName(breedData[data.breed].name)
                setCost(breedData[data.breed].cost)

            },
            (err) => {
                setBreed("")
                setAddress(broken)
                setAge("")
                setName("")
                setCost("")

            }, 
        )
    },
        [useSelector(f => f.breed), useSelector(f => f.size), useSelector(f => f.furLength)])

    return (
        <div className="petBlock">
            <img className="petPhoto" src={address} alt="пёсель" />
            <div className="petInfo">
                <p className="breed subheading">{name}</p>
                <p className="age avarage">{age}</p>
                <p className="price avarageBig">{cost}</p>
            </div>


        </div>
    )
}
export default PetCard;