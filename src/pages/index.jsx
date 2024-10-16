import { useEffect, useState } from "react";
import { MainMap } from "../components/MainMap"
import { SideOverlay } from "../components/SideOverlay";

export const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [classData, setClassData] = useState([]);
  const [showedData, setShowedData] = useState([]);
  const classes = [
    { latitude: 25.034, longitude: 121.564, name: "Event 1", description: "Description for Event 1" },
    { latitude: 25.030, longitude: 121.570, name: "Event 2", description: "Description for Event 2" },
  ];
  useEffect(() => {
    const getData = async () => {
      const res1131 = await fetch("/data/1131-class-all.json");
      const data1131 = await res1131.json();
      setClassData(data1131);
      setShowedData(data1131);
      return data1131
    }

    getData();
  }, [])
  useEffect(() => {
    console.log(classData)
    // {
    //   "開課序號": 899,
    //   "開課代碼": "01UG003",
    //   "系所": "通識",
    //   "組": null,
    //   "年": null,
    //   "班": null,
    //   "全英語": "是",
    //   "MOOCS": null,
    //   "限性別": null,
    //   "中文課程名稱": "西洋古典音樂 [ 97-105入學：藝術與美感 ；106-108入學：藝術與美感  ；109起入學：人文藝術 ]",
    //   "英文課程名稱": "Classical Music [ Fall Semester 2017 and Before : Art and Aesthetics ; From Fall Semester 2017 to Spring Semester 2020 : Art and Aesthetics  ; Fall Semester 2020 and After : Humanities and Arts ]",
    //   "學分": 2,
    //   "必/選": "通",
    //   "全/半": "半",
    //   "教師": "劉思涵",
    //   "地點時間": "四 8-9 公館 Ｓ101",
    //   "限修人數": 50,
    //   "選修人數": 53,
    //   "限修條件": "◎音樂系（學）不得選修",
    //   "備註": null
    // }
  }, [classData])
  return (
    <div style={{height: "100vh", width: "100%", display: "flex", flexDirection: "column"}}>
      <MainMap classes={classes} />
      <div style={{padding: 10, display: "flex", flexDirection: "row-reverse"}}>
        <SideOverlay classes={showedData} show={showOverlay} setShow={setShowOverlay} />
      </div>
    </div>
  )
}
