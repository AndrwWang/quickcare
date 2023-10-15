import { DatasetLinked } from "@mui/icons-material";
import DataGatherer from "../scraper";

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



export default async function  ERRoom(){

    var data = await DataGatherer();
    var newarr = [...data];

    await ChildrenHospitalInfo().then((response) => {
        let info = response.hospitals;
        response.hospitals.map((objects) => {
            newarr.push(objects);
        })
        
    });

    return newarr;


}