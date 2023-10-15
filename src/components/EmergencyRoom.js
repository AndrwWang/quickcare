import React, {useState, useEffect} from "react";
import { DataGatherer } from "../scraper";

function ChildrenHospitalInfo(){

    return new Promise((resolve, reject) => {
        fetch("http://localhost:3001/api/fetch-data").then((response) => response.text())
          .then((data) => {
            resolve(JSON.parse(data));
          })
          .catch((error) => {
            console.error('Error:', error);
            reject(error);
          });
      });
}



export default function ERRoom (){

    const [newArray, setArray] = useState([]);

    function HospitalInfo (){
        var arr = [];
        const data = DataGatherer();
    
        let size = data.length;
        for (let i = 0; i < size; i++){
            if(i == 0 || i == 3 || i == 4 || i == 5 || i == 10 || i == 11 || i == 13){
                continue;
            }
            arr.push((<div key={i} className="hospital">{data[i].name + ": " + " Wait Times " + data[i].time.split("min")[0] + " minutes"}</div>))
        }
    
        ChildrenHospitalInfo().then((response) => {
                arr.push((
                    <div key={"0ch"} className="hospital">
                    {response.hospitals[0].name + ": " + " Wait Times " + response.hospitals[0].time + " minutes"}
                    </div>))
                arr.push((
                    <div key={"1ch"} className="hospital">
                    {response.hospitals[1].name + ": " + " Wait Times " + response.hospitals[1].time + " minutes"}
                    </div>))
                arr.push((
                    <div key={"2ch"} className="hospital">
                    {response.hospitals[2].name + ": " + " Wait Times " + response.hospitals[2].time + " minutes"}
                    </div>))

                return setArray(arr);
    
    });
    
    return newArray;
    
    
    }

    return ( <div className="hospital-container">
        {HospitalInfo()}
    </div>)

}