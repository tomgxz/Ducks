import { Application } from "https://cdn.skypack.dev/@splinetool/runtime@0.9.416";

const canvas = document.getElementById("3d-duck-canvas");
const app = new Application(canvas);

app
  .load("https://prod.spline.design/IOkt1f9seAuksDww/scene.splinecode")
  .then(() => {

    const duck = app.findObjectByName("duck-main");

})